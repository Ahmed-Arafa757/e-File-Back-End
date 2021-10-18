var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Users = new Schema({
    userName: {
        type: String,
        required: true,
        max: 15,
        min: 3,
    },
    password: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 5,
    },
}, {
    collection: "Users"
});

var Users = mongoose.model("Users", Users);

module.exports = Users;
