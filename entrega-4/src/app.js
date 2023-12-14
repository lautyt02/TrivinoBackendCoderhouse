//Imports
import { ProductManager } from "./ProductManager.js"
import express from 'express'
//Config
const myProductManager = new ProductManager()
const app = express()
app.use(express.urlencoded({ extended: true }))
//Requests
app.get('/products', async (req, res) => {
    let limit = req.query.limit
    const myProducts = await myProductManager.getProducts()
    if(limit>myProducts.length){
        limit=myProducts.length
    }
    if (limit) {
        let myLimitedProducts = []
        for (let i = 0; i < limit; i++) {
            myLimitedProducts.push(myProducts[i])
        }
        res.send(myLimitedProducts)
    }
    else {
        res.send(myProducts)
    }

})
app.get('/products/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    res.send(await myProductManager.getProductById(id))
})
//Run Server
app.listen(8080, () => console.log('server runing'))