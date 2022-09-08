const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    images: { type: String, require: false },
})

module.exports = mongoose.model('ProductSchema', ProductSchema);