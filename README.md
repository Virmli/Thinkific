# Thinkific
Thinkific Developer Challenge Incrementing Integers As A Service

This solution was created with Node.js Express JSON Web Tokens PostgreSQL and Sequelize.

Developed in OSx environment.

To start project:
  - Install DataBase, easy solution to spin up Docker contianer with default PostgreSQL image (shoudl use default port 5432). 
    After edit ./config/config.js inside project folder to use correct DataBase.

  - cd /to/project/directory

  - $npm install

  - $npm start

This should start RESTfull server on your localhost:3000/

If you want to run unit test use command below

  - $npm test-unit-user

API description:
Use Postman or CURL to interact with API.
  - POST localhost:3000/users/login => if user exist returns token to use with api
  - POST localhost:3000/users/ 
  
API below will require token in order to talk to them     
  - GET localhost:3000/users/:id/next => returns next incrimented integer
  - GET localhost:3000/users/:id/current => returns current integer
  - GET localhost:3000/users/:id/reset/current => resets current integer

  - DELETE localhost:3000/users/:id => deletes user

