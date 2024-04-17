//Imports
import { Router } from "express"
import { productsModel } from "../dao/mongo/models/product.model.js"
import { io } from "../app.js"

//Declaraciones
const productsRouter = Router()

//GETs
productsRouter.get('/', async (req, res) => {
    let limit = req.query.limit
    try {
        if (limit) {
            const limitedProducts = await productsModel.find().limit(limit)
            res.json({ limitedProducts, })
        }
        else {
            const allProducts = await productsModel.find()
            res.json({ allProducts, })
        }
    }
    catch (error) {
        res.status(400).json({ error, })
    }

})
productsRouter.get('/:pid', async (req, res) => {
    const id = req.params.pid
    try {
        res.json({ status: "success", product: await productsModel.find({ _id: id }) })
    }
    catch (error) {
        res.status(400).json({ error, })
    }
})
//POST
productsRouter.post('/', async (req, res) => {
    const product = await req.body
    try {
        await productsModel.create(product)
        const products = await productsModel.find().lean()
        io.emit('updateClients', products)
        res.json([{ message: "Product added successfully" },product])
    } catch (error) {
        res.status(400).json({ error, })
    }
})
//PUT
productsRouter.put('/:pid', async (req, res) => {
    const id = req.params.pid
    const newData = await req.body
    try {
        await productsModel.updateOne({ _id: id }, { $set: newData })
        const products = await productsModel.find().lean()
        io.emit('updateClients', products)
        res.json({ status: "success", message: "Product Updated Successfully" })
    } catch (error) {
        res.status(400).json({ error, })
    }
})
//DELETE
productsRouter.delete('/:pid', async (req, res) => {
    const id = req.params.pid
    try {
        await productsModel.deleteOne({ _id: id })
        const products = await productsModel.find().lean()
        io.emit('updateClients', products)
        res.json({ status: "success", message: "Product deleted successfully" })
    } catch (error) {
        res.status(400).json({ error, })
    }
})
//EXPORT
export { productsRouter }