/**
 * Created by maksym on 2017-05-04.
 */
const db = require('../shared/databaseConnector');

const models = db.models;

const UserDataAccessObject = {
    toExport: {
        /**
         * Create User
         * @param user
         * @returns {Promise}
         */
        create(userObj) {
            return models.user.create(userObj);
        },

        /**
         * Get User By Id
         * @param id
         * @returns {Promise}
         */
        findById(id) {
            return models.user.findOne({
                where: {
                    id,
                },
            });
        },
        /**
         * Find user by login and password.
         * @param credentials
         * @returns {*}
         */
        findByLoginPassword(credentials) {
            return models.user.findOne({
                where: {
                    login: credentials.login,
                    password: credentials.password,
                },
            });
        },
        /**
         * Update current integer to the next in sequence for specific user.
         * @param id
         * @param nextInt
         * @returns {account}
         */
        updateCurrentInt(id, nextInt) {
            return models.user.findOne({
                where: {
                    id,
                },
            }).then((user) => {
                if (user) {
                    user.updateAttributes({
                        currentInteger: nextInt,
                    }).then(result => result);
                } else {
                    return null;
                }
                return user;
            });
        },
        /**
         * Delete User
         * @param id
         * @returns {Promise}
         */
        delete(id) {
            // TODO: cascade accounts table also.
            // TODO: delete all user transactions?
            return models.user.destroy({
                where: {
                    id,
                },
            });
        },
    },
};

module.exports = UserDataAccessObject.toExport;
