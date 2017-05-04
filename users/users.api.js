/**
 * Created by maksym on 2017-05-04.
 */
const express = require('express');
const userService = require('./users.service');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const router = express.Router();

const appSecret = { superSecret: config.secret };

/**
 * Get user with specific id
 */
router.post('/login', (req, res) => {
    const credentials = {
        login: req.body.login,
        password: req.body.password,
    };
    userService.loginUser(credentials).then((result) => {
        if (!result) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        }
        // check if password matches
        if (credentials.password !== result.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
            // if user is found and password is right
            // create a token

            const token = jwt.sign(result.dataValues, appSecret.superSecret, {
                expiresIn: 86400, // expires in 24 hours
            });
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token,
                user: result,
            });
        }
    });
});

/**
 * Create a simple user
 * Note: login is unique (just to show the concept)
 *
 */
router.post('/', (req, res) => {
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
    };
    userService.createUser(newUser).then((result) => {
        res.send(result);
    });
});

/**
 *  After here we will have secured api
 */

// route middleware to authenticate and check token
router.use((req, res, next) => {
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.param('token') || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, appSecret.superSecret, (err, decoded) => {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            }
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            return next();
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.',
        });
    }
});

/**
 * Deletes specific user using his id
 */
router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    if (isNaN(userId)) {
        res.send('userId should be a number');
    }
    userService.deleteUser(userId).then((result) => {
        res.send('User deleted');
    });
});

/**
 * Get the next integer in the sequence for the user with id.
 */
router.get('/:id/next', (req, res) => {
    const obj = {
        id: req.params.id,
    };
    userService.integerManipulation(obj).then((result) => {
        res.send(result);
    });
});

/**
 * Get the current integer
 */
router.get('/:id/current', (req, res) => {
    const userId = req.params.id;
    userService.getUserById(userId).then((result) => {
        if (result != null) {
            res.send({ currentInteger: result.currentInteger });
        } else {
            res.send('User does not exist');
        }
    });
});

/**
 * Reset the current integer for the user.
 */
router.put('/:id/reset/current', (req, res) => {
    const obj = {
        id: req.params.id,
        newInt: req.body.newInt,
        type: 'reset',
    };
    if (!(isNaN(obj.newInt)) && obj.newInt <= 0) {
        res.json({ success: false, message: 'New integer should be number and greater or equal to 0' });
    } else {
        userService.integerManipulation(obj).then((result) => {
            res.send(result);
        });
    }
});

module.exports = router;
