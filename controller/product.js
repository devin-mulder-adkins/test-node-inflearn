const productModel = require('../models/Product')

exports.createProduct = (req, res, next) => {
    const createdProduct = productModel.create(req.body)
    console.log('createdProduct', createdProduct)
    res.status(201).json(createdProduct)
}