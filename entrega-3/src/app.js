//Imports
import { ProductManager } from "./ProductManager";
import express from 'express'
//Config
const myProductManager = new ProductManager()
const app = express()
app.use(express.urlencoded({extended: true}))
//Requests
app.get('products',async (req,res)=>{
    const {limit} = req.query
    const myProducts = await myProductManager.getProducts()
    if(!limit){
        let myLimitedProducts =[]
        for(let i=0; i<limit;i++){
            myLimitedProducts.push(myProducts[i])
        }
        res.send(myLimitedProducts)
    }
    res.send(myProducts)
})
//Run Server
app.listen(8080,()=>console.log('server runing'))