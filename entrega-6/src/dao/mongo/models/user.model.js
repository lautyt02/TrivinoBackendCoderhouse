import mongoose from 'mongoose'
const usersCollection = 'users'
const usersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String
})
const usersModel = mongoose.model(usersCollection, usersSchema)
export { usersModel }