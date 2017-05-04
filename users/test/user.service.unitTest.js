/**
 * Created by maksym on 2017-05-04.
 */
const expect = require('chai').expect;
const sinon = require('sinon');
const userDAO = require('../users.dao');
const userService = require('../users.service');

describe('******User Service Unit Tests*****', () => {
    beforeEach(function () {
        try {
            this.sandbox = sinon.sandbox.create();
        } catch (err) {
            console.log('***************** something went wrong ********** in the beforeEach: ', err);
        }
    });

    afterEach(function () {
        this.sandbox.restore();
    });

    it('Create a User', function () {
        const user = {
            id: 2,
            firstName: 'Test',
            lastName: 'TestLast',
            login: 'rando643',
            password: 'test',
        };

        this.sandbox.stub(userDAO, 'create').returns(Promise.resolve({
            id: 2,
            firstName: 'Test',
            lastName: 'TestLast',
        }));

        return userService.createUser(user).then((result) => {
            expect(result.id).to.equal(2);
        });
    });

    it('Login User', function () {
        const findByLoginPassword = this.sandbox.stub(userDAO, 'findByLoginPassword').returns(Promise.resolve({
            message: 'token',
        }));

        return userService.loginUser({
            login: 'test',
            password: 'test',
        })
            .then((result) => {
                expect(findByLoginPassword.called).to.equal(true);
                expect(result.message).to.equal('token');
            });
    });
});
