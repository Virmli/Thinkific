const express = require('express');
const logger = require('morgan');
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const server = http.createServer(app);

const dbConnector = require('./shared/databaseConnector');

app.set('port', 3000);
server.listen(app.get('port'), () => {
    console.log(`Express server listening on port ${server.address().port}`);
});

// Catch unhandled exceptions and gracefully shut down the process.
process.on('uncaughtException', () => {
    stopGracefully();
});

function stopGracefully() {
    console.log('Attempting to stop gracefully...');
    // Stop taking new requests
    server.close();

    // Disconnect from database
    dbConnector.disconnect();
}


// Simple RESTfull interface
const users = require('./users/users.api');

app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = {
    app,
};
