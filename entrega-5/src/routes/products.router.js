//Imports
import { Router } from "express"
import { ProductManager } from "../classes/ProductManager.js"

import { io } from "../app.js"

//Declaraciones
const productsRouter = Router()
const myProductManager = new ProductManager()

//GETs
productsRouter.get('/', async (req, res) => {
    let limit = req.query.limit
    const myProducts = await myProductManager.getProducts()
    if (limit > myProducts.length) {
        limit = myProducts.length
    }
    if (limit) {
        let myLimitedProducts = []
        for (let i = 0; i < limit; i++) {
            myLimitedProducts.push(myProducts[i])
        }
        res.json(myLimitedProducts)
    }
    else {
        res.json(myProducts)
    }

})
productsRouter.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    res.json(await myProductManager.getProductById(id))
})
//POST
productsRouter.post('/', async (req, res) => {
    const {title, description, code, price, stock, category, thumbnails} = await req.body
    const message = await myProductManager.addProduct(title, description, code, price, stock, category, thumbnails)
    if (message == "Producto añadido con éxito") {
        const myProducts = await myProductManager.getProducts()
        io.emit('updateClients', myProducts)
        console.log('sended updateServer Event')
        res.status(201).json({ status: "success", message: message })
    }
    else {
        res.status(400).json({ status: "error", error: message })
    }

})
//PUT
productsRouter.put('/:pid',async (req, res) => {
    const id = parseInt(req.params.pid)
    const newData= await req.body
    const message = await myProductManager.updateProduct(id,newData)
    if(message == "Producto modificado con éxito"){
        const myProducts = await myProductManager.getProducts()
        io.emit('updateClients', myProducts)
        res.json({ status: "success", message: message })
    }
    else{
        res.status(400).json({ status: "error", error: message })
    }
})
//DELETE
productsRouter.delete('/:pid',async (req, res) => {
    const id = parseInt(req.params.pid)
    const message = await myProductManager.deleteProduct(id)
    if(message == "Producto eliminado con éxito"){
        const myProducts = await myProductManager.getProducts()
        io.emit('updateClients', myProducts)
        res.json({ status: "success", message: message })
    }
    else{
        res.status(400).json({ status: "error", error: message })
    }
})
//EXPORT
export { productsRouter }