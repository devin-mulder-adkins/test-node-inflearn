const productController = require('../../controller/product')
const productModel = require('../../models/Product')
const httpMocks = require('node-mocks-http')
const newProduct = require('../data/new-product.json')

productModel.create = jest.fn();

let req, res, next

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
})

describe("Product Controller Create", () => {

    beforeEach(() => {
        req.body = newProduct;
    })

    it("should have a createProduct function", ()=> {
        expect(typeof productController.createProduct).toBe('function')
    })

    it("should call productController.createProduct", () => {
        productController.createProduct(req, res, next);
        expect(productModel.create).toBeCalledWith(newProduct);
    })

    it("should return 201 response code", async () => {
        await productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201)
        expect(res._isEndCalled()).toBeTruthy()
    })

    
})
