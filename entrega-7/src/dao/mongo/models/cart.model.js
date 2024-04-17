import mongoose from 'mongoose'
const cartsCollection = 'carts'
const cartsSchema = new mongoose.Schema({
    products: [{ 
        productId: Number, 
        quantity: Number 
    }]
})
const cartsModel = mongoose.model(cartsCollection, cartsSchema)
export { cartsModel }