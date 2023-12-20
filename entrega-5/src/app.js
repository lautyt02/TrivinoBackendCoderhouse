//Imports
import express from 'express'
import { productsRouter } from "./routes/products.router.js"
import { cartsRouter } from "./routes/carts.router.js"
//Config
const port=8080
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('../public'))
const server = app.listen(port, () => console.log('server runing'))//Run Server
//Requests
app.use('/api/products/', productsRouter)
app.use('/api/carts/', cartsRouter)