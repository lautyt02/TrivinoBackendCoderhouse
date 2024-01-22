//Imports
import { Router } from "express"
import { ProductManager } from "../classes/ProductManager.js"
//Declaraciones
const viewsRouter = Router()
const myProductManager = new ProductManager()
//GETs
viewsRouter.get('/', async(req,res)=>{
    const myProducts = await myProductManager.getProducts()
    res.render('home',{lenguage: 'es', title: 'Productos', myProducts, })
})
viewsRouter.get('/realTimeProducts', async(req,res)=>{
    const myProducts = await myProductManager.getProducts()
    res.render('realTimeProducts',{lenguage: 'es', title: 'Productos en Tiempo Real', myProducts, })
})

export { viewsRouter }