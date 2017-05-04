/**
 * Created by maksym on 2017-05-04.
 */
const expect = require('expect.js');
const db = require('../../shared/databaseConnector');
const userDAO = require('../users.dao');

describe('*******User DAO tests******', () => {
    before((done) => {
        db.connect({
            logging: false,
        });

        db.loadModels((err) => {
            if (err) {
                console.log('Could not sync with the database');
                return;
            }
            done();
        });
    });

    after((done) => {
        db.disconnect();
        done();
    });


    it('Create Device Test', () => userDAO.create({
        id: 2000,
        firstName: 'Test',
        lastName: 'LastNameTest',
        email: 'test@gmail.com',
        login: 'random123',
        password: 'test',
    })
        .then((result) => {
            const response = result.dataValues;
            expect(response).to.not.be.null;
            expect(response.id).to.equal(2000);
            expect(response.firstName).to.equal('Test');
        }));

    it('Create Device Test. Violates unique', () => userDAO.create({
        id: 3000,
        firstName: 'Test',
        login: 'test',
        password: 'test',
    })
        .then((result) => {})
        .catch((err) => {
            expect(err).to.not.be.null;
        }));


    it('Find Device By Id Test', () => userDAO.findById(2000)
        .then((result) => {
            const response = result.dataValues;
            expect(response).to.not.be.null;
            expect(response.id).to.equal(2000);
            expect(response.firstName).to.equal('Test');
            expect(response.lastName).to.equal('LastNameTest');
        }));

    it('Find Device By Id Test, Device not exist', () => userDAO.findById(223)
        .then((result) => {
            expect(result).to.be.null;
        }));

    it('Delete Device Test', () => userDAO.delete(2000)
        .then((result) => {
            expect(result).to.equal(1);
        }));
});
