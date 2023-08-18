const Router = require("express").Router;
const UserController = require("./UsersController.js");
const routes = Router();

routes.post('/users', UserController.create);
routes.get('/users', UserController.getAll);
routes.get('/users/:id', UserController.getOnlyOne);
routes.put('/users', UserController.change);
routes.delete('/users/:id', UserController.delete);

module.exports = routes;