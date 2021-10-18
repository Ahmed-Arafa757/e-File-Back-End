var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ContactsSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 30,
        min: 3,
    },
    phone: {
        type: String,
        required: true,
        max: 20,
        min: 7,
    },
    address: String,
    notes: String

}, {
    collection: "Contacts"
});

var Contacts = mongoose.model("Contacts", ContactsSchema);

module.exports = Contacts;