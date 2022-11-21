const request = require('supertest')
const app = require('../../server')
const newProduct = require('../data/new-product.json')

let firstProduct

it("POST /api/products", async () => {
    const response = await request(app)
    .post("/api/products")
    .send(newProduct);

    //console.log('response.body: ', response.body)
    expect(response.statusCode).toBe(201)
    expect(response.body.name).toBe(newProduct.name)
    expect(response.body.description).toBe(newProduct.description)
})


it("should return 500 on POST /api/products", async () => {
    const response = await request(app)
    .post("/api/products")
    .send({ name: "phone"});

    expect(response.statusCode).toBe(500)
    expect(response.body).toStrictEqual({ message: "products validation failed: description: Path `description` is required."})
})


it("GET /api/products", async () => {
    const response = await request(app).get('/api/products')
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body[0].name).toBeDefined()
    expect(response.body[0].description).toBeDefined()
    firstProduct = response.body[0]
})


it("GET /api/products/:productId", async () => {
    const response = await request(app).get('/api/products/' + firstProduct._id)
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe(firstProduct.name)
    expect(response.body.description).toBe(firstProduct.description)
})


it("GET id doesn't exist /api/products/:productId", async () => {
    const response = await request(app).get('/api/products/63799472b7b04e8949c5df88')
    expect(response.statusCode).toBe(404)
})



it("PUT /api/products", async () => {
    const res = await request(app)
        .put("/api/products/" + firstProduct._id)
        .send({ name: "updated name", description: "updated desription" });
    expect(res.statusCode).toBe(200)
    expect(res.body.name).toBe("updated name")
    expect(res.body.description).toBe("updated desription")
})

