const UserService = require("./UserService.js");
const path = require("path");

module.exports = class UserController {
    static async create(req, res) {
        await UserService.create(req.body, req.files.picture)
        .then(user => res.json(user))
        .catch(err => res.json(err))
        console.log(req.files.picture.mv(path.resolve('static', 'kdlkds.jpg')));
    };
    static async getAll(req, res) {
        await UserService.getAll()
        .then(users => res.json(users))
        .catch(err => console.log(err))
    };
    static async getOnlyOne(req, res) {
        await UserService.getOnlyOne(req.params.id)
        .then(onlyUser => res.json(onlyUser))
        .catch(err => res.json(err));
    };
    static async change(req, res) {
        await UserService.change(req.body)
        .then(updUser => res.json(updUser))
        .catch(err => res.status(500).json(err));
    };
    static async delete(req, res) {
        await UserService.delete(req.params.id)
        .then(delUser => res.json(delUser))
        .catch(err => res.json(err));
    };
};