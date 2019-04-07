const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {type: String, required: true, max: 75},
    username: {type: String, required: true, max: 75},
    password: {type: String, required: true},
    roleName: {type: String},
    createBy: {type: String},
    createDate: {type: Date, default: new Date()},
    modifiedBy: {type: String},
    modifiedDate: {type: Date, default: new Date()},
});

module.exports = mongoose.model('User', UserSchema);