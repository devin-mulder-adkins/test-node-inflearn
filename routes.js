const express = require('express')
const router = express.Router()
const productController = require('./controller/product')
router.get('/', productController.getProducts)
router.get('/:productId', productController.getProductById)
router.post('/', productController.createProduct)

module.exports = router
