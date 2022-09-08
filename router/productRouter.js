const express = require('express')
let routerProduct = express.Router()
const ProductSchema = require('../models/product')

routerProduct.get('/', (req, res) => {
    res.json('ROUTER GET')
})

routerProduct.post('/create', (req, res) => {
    const productSchema = new ProductSchema(req.body);
    productSchema
        .save()
        .then((productSchema) => {
            res.status(200).json(productSchema);
        })
        .catch((err) => {
            res.status(400).send('create product faled')
        })
})

module.exports = routerProduct