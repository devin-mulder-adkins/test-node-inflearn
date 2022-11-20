const productController = require('../../controller/product')
const productModel = require('../../models/Product')

productModel.create = jest.fn();

describe("Product Controller Create", () => {

    it("should have a createProduct function", ()=> {
        expect(typeof productController.createProduct).toBe('function')
    })

    it("should call productController.createProduct", () => {
        productController.createProduct();
        expect(productModel.create).toBeCalled();
    })
    
})
