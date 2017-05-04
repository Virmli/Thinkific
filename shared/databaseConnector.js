/**
 * Created by maksym on 2017-05-04.
 */
const maxDbPool = require('../config/config.js').maxDbConnectionPool;
const dbCredentials = require('../config/config.js').dbCredentials;
const fs = require('fs');
const Sequelize = require('sequelize');
const extend = require('util')._extend;
const logger = require('morgan');

module.exports = (function DatabaseConnector() {
    return {
        models: {},
        db: {},
        connect(options) {
            const config = extend({
                host: 'localhost',
                dialect: 'postgres',
                pool: {
                    max: maxDbPool,
                    min: 0,
                    idle: 10000,
                },
            }, options);
            this.db = new Sequelize(dbCredentials.userName, dbCredentials.dbName, dbCredentials.password, config);
        },
        getDB() {
            return this.db;
        },
        disconnect() {
            logger('Disconnecting from Postgres database');
            this.db.close();
        },
        loadModels(callback) {
            const that = this;
            // Load the models into the applicaiton and sync with db
            fs.readdirSync(__dirname)
                .filter(file => (file.indexOf('.') !== 0) && (file !== 'databaseConnector.js')).forEach((modelFile) => {
                const model = that.db.import(modelFile);
                that.models[model.name] = model;
            });

            Object.keys(that.models).forEach((modelName) => {
                if ('associate' in that.models[modelName]) {
                    that.models[modelName].associate(that.models);
                }
            });

            that.db.sync().then(() => {
                console.log('Postgres Synchronized!');
                callback();
            }, (err) => {
                console.log('An error occurred while creating the table:', err);
                callback(err);
            });
        },
    };
}());
