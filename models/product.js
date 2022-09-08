const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    images: { type: String, require: false },
}, {
    timestamps: true,
})

module.exports = mongoose.model('ProductSchema', ProductSchema);