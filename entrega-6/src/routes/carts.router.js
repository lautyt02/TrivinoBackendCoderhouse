//Imports
import { Router } from "express"
import { cartsModel } from "../dao/mongo/models/cart.model.js"
//Declaraciones
const cartsRouter = Router()
//GET
cartsRouter.get('/:cid', async (req, res) => {
    const id = req.params.cid
    try {
        const cart = await cartsModel.find({ _id: id })
        res.json({ status: "success", cart, })
    } catch (error) {
        res.status(400).json({ error, })
    }
})
cartsRouter.get('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid
    const pid = parseInt(req.params.pid)
    try {
        const cart = await cartsModel.find({ $and: [{ _id: cid }, { products: { $elemMatch: { productId: pid } } }] })//{ _id: cid, 'products.productId': pid  }
        res.json({ status: "success", cart, })
    } catch (error) {
        res.status(400).json({ error, })
    }
})
//POSTs
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid
    const pid = parseInt(req.params.pid)
    try {
        const doesExist = await (await cartsModel.find({ _id: cid, "products.productId": pid })).length > 0
        if (doesExist) {
            await cartsModel.updateOne({ _id: cid, "products.productId": pid }, { $inc: { "products.$.quantity": 1 } })
        }
        else {
            await cartsModel.updateOne({ _id: cid }, {$push:{products:{productId:pid,quantity:1}}})
        }
        res.json({ status: "success", message: "Updated successfully" })
    } catch (error) {
        res.status(400).json({ error, })
    }
})
cartsRouter.post('/', async (req, res) => {
    const { products } = await req.body
    console.log(products)
    try {
        await cartsModel.create({
            products,
        })
        res.json({ status: "success", message: "Cart added successfully" })
    } catch (error) {
        res.status(400).json({ error, })
    }
})
//EXPORT
export { cartsRouter }