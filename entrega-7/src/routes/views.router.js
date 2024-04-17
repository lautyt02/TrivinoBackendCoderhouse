//Imports
import { Router } from "express"
import { productsModel } from "../dao/mongo/models/product.model.js"
import { messagesModel } from "../dao/mongo/models/message.model.js"
//Declaraciones
const viewsRouter = Router()

//GETs
viewsRouter.get('/', async(req,res)=>{
    const myProducts = await productsModel.find().lean()
    res.render('home',{lenguage: 'es', title: 'Productos', myProducts, })
})
viewsRouter.get('/realTimeProducts', async(req,res)=>{
    const myProducts = await productsModel.find().lean()
    res.render('realTimeProducts',{lenguage: 'es', title: 'Productos en Tiempo Real', myProducts, })
})
viewsRouter.get("/chat", async(req,res)=>{
    const messages= await messagesModel.find().lean()
    res.render('chat',{lenguage: 'es', title: 'Chat', messages, })
})

export { viewsRouter }