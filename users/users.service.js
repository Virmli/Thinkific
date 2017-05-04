/**
 * Created by maksym on 2017-05-04.
 */
const userDao = require('./users.dao');

const DeviceService = {
    /**
     * Create User
     * @param user
     * @returns {Promise}
     */
    createUser(user) {
        return userDao.create(user)
            .then(result => result)
            .catch(err => `Woops, something wrong err: ${err}`);
    },
    /**
     * Get User By Id
     * @param id
     * @returns {Promise}
     */
    loginUser(credantials) {
        return userDao.findByLoginPassword(credantials)
            .then(result => result)
            .catch(err => `Woops, something wrong err: ${err}`);
    },
    /**
     * This function provide user with next integer in a sequance.
     * @param id
     * @returns {Promise.<TResult>}
     */
    getNextInt(id) {
        return userDao.findById(id)
            .then((user) => {
                if (user) {
                    const nextInt = user.dataValues.currentInteger + 1;
                    return userDao.updateCurrentInt(id, nextInt)
                        .then(result => ({ currentInteger: result.dataValues.currentInteger }))
                        .catch(err => `Woops, something wrong err: ${err}`);
                }
                return 'User does not exist';
            })
            .catch(err => `Woops, something wrong err: ${err}`);
    },
    /**
     * Reset current int.
     * TODO: we can merge two functionalities in one. by passing extra params like reset or next.
     */
    resetCurrentInt(id, newInt) {
        return userDao.findById(id)
            .then((user) => {
                if (user) {
                    return userDao.updateCurrentInt(id, newInt)
                        .then(result => ({ currentInteger: result.dataValues.currentInteger }))
                        .catch(err => `Woops, something wrong err: ${err}`);
                }
                return 'User does not exist';
            })
            .catch(err => `Woops, something wrong err: ${err}`);
    },
    /**
     * Get User By Id
     * @param id
     * @returns {Promise}
     */
    deleteUser(id) {
        return userDao.delete(id)
            .then(result => result)
            .catch(err => `Woops, something wrong err: ${err}`);
    },
};

module.exports = DeviceService;
