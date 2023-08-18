const mong = require("mongoose");
const User = new mong.Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    picture: {type: String, required: false}
});

module.exports = mong.model('User', User);