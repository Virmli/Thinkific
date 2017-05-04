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
     * Login user into system.
     * @param id
     * @returns {Promise}
     */
    loginUser(credantials) {
        return userDao.findByLoginPassword(credantials)
            .then(result => result)
            .catch(err => `Woops, something wrong err: ${err}`);
    },
    /**
     * Get User By Id
     * @param id
     * @returns {Promise}
     */
    getUserById(id) {
        return userDao.findById(id)
            .then(result => result)
            .catch(err => `Woops, something wrong err: ${err}`);
    },
    /**
     * This function provide user with next integer in a sequance.
     * If obj.type exist then reset current integer with number provided by user.
     * @param obj
     * @returns {Promise.<TResult>}
     */
    integerManipulation(obj) {
        let number;
        return userDao.findById(obj.id)
            .then((user) => {
                if (user) {
                    // if we want to reset image then we pass new interger
                    if (obj.type === 'reset') {
                        number = obj.newInt;
                    } else {
                        // if we want to increment current integer.
                        number = user.dataValues.currentInteger + 1;
                    }
                    return userDao.updateCurrentInt(obj.id, number)
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
