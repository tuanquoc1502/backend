const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
}, {
    timestamps: true,
})

module.exports = mongoose.model('AuthSchema', AuthSchema);