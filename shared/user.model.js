/**
 * Created by maksym on 2017-05-04.
 */
module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('user', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 255],
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 255],
            },
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                len: [1, 255],
            },
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currentInteger: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        className: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.Model.name}`;
            },
        },

    }, {
        indexes: [{
            unique: true,
            fields: ['login'],
        }]
    });
    return User;
};
