const express = require('express')

const PORT = 5000

const app = express()
const productRoutes = require('./routes')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://junho:1234@testcluster1.36dil.mongodb.net/?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('MongoDB Connected...'))
        .catch(err => console.log(err))


app.use(express.json())
app.use('/api/products', productRoutes)

app.get('/', (req, res) => {
    res.send('Hello World')
})


app.listen(PORT)
console.log(`Running on port ${PORT}`)


app.use((err, req, res, next) => {
    res.status(500).json({message: err.message})
})


module.exports = app