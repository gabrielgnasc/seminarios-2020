const {Router} = require('express');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const UserDelete = require('./controllers/UserDelete');
const CreateUser = require('./controllers/CreateUserController');
const UpdateUser = require('./controllers/UpdateUserController');
const UserByToken = require('./controllers/UserByToken');


const routes = Router();

routes.post('/login', LoginController.index);

routes.get('/users', UserController.index);

routes.get('/user/:id', UserController.store);

routes.delete('/delete/:id', UserDelete.index);

routes.post('/createUser', CreateUser.index);

routes.post('/createUser', CreateUser.index);

routes.get('/token/:token', UserByToken.index);
//  #9e24bf 

module.exports = routes ;