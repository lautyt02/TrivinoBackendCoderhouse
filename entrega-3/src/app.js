//Imports
import { ProductManager } from "./ProductManager";
import express from 'express'
//Config
const myProductManager = new ProductManager()
const app = express()
app.use(express.urlencoded({extended: true}))
//Run Server
app.listen(8080,()=>console.log('server runing'))