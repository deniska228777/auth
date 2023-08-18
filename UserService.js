const User = require("./User.js");
const FileService = require("./fileService.js");
const bcrypt = require("bcryptjs");

module.exports = class UserService {
    static async create({name, email, password, userpicture}) {
        const fileName = FileService.saveFile(userpicture);
        const createUser = await User.create({name, email, password: password, picture: fileName})
        return createUser;
    };
    static async getAll() {
        const users = await User.find();
        return users;
    };
    static async getOnlyOne(id) {
        const user = await User.findById(id)
        return user;
    };
    static async change(user) {
        const updUser = await User.findByIdAndUpdate(user._id, user, {new: true});
        return updUser;
    };
    static async delete(id) {
        const delUser = await User.findByIdAndDelete(id)
        return delUser
    };
    static async findByEmail(email) {
        const checkUser = await User.findOne({email: email});
        return checkUser;
    };
};