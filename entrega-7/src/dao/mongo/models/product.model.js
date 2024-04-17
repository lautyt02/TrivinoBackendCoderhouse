import mongoose from 'mongoose'
const productsCollection = 'products'
const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: { type: String, unique: true },
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails: [String]
})
const productsModel = mongoose.model(productsCollection, productsSchema)
export { productsModel }