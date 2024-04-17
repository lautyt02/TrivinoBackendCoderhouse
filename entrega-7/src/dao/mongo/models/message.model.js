import mongoose from 'mongoose'
const messagesCollection = 'mesagges'
const messagesSchema = new mongoose.Schema({
    user: String,
    message: String
})
const messagesModel = mongoose.model(messagesCollection, messagesSchema)
export { messagesModel }