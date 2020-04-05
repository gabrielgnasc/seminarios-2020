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

routes.get('/userType/:param', UserController.getUserByEmail);

routes.delete('/delete/:id', UserDelete.index);

routes.post('/updateUser', UpdateUser.index);

routes.post('/createUser', CreateUser.index);

routes.get('/token/:token', UserByToken.index);
 
module.exports = routes ;