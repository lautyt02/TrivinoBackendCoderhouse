//Imports
import { Router, response } from "express"
import { CartManager } from "../classes/CartManager.js"
//Declaraciones
const cartsRouter = Router()
const myCartManager = new CartManager()
//GET
cartsRouter.get('/:cid', async (req, res) => {
    const id = parseInt(req.params.cid)
    const myResponse = await myCartManager.getProductsById(id)
    if (typeof (myResponse) == 'string') {
        res.status(400).json({ status: "error", message: myResponse })
    }
    else {
        res.json(myResponse)
    }
})
//POSTs
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)
    const message = await myCartManager.addProduct(cid, pid)
    if (message[0] == 'N') {
        res.status(400).json({ status: "error", message, })
    }
    else {
        res.json({ status: "succes", message, })
    }
})
cartsRouter.post('/', async (req, res) => {
    const { products } = await req.body
    const message = await myCartManager.addCart(products)
    res.json({status:"succes", message,})
})
//EXPORT
export { cartsRouter }