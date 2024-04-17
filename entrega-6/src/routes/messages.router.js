//Imports
import { Router } from "express"
import { messagesModel } from "../dao/mongo/models/message.model.js"
import { io } from "../app.js"
//Declaraciones
const messagesRouter = Router()
//Requests

//GET
messagesRouter.get("/", async (req, res) => {
    try {
        const messages = await messagesModel.find()
        res.json({ messages, })
    } catch (error) {
        res.status(400).json({ error, })
    }
})

//POST
messagesRouter.post("/", async (req, res) => {
    const message = await req.body
    try {
        await messagesModel.create(message)
        const messages = await messagesModel.find()
        io.emit('updateMessages', messages)
        res.json({ message: "Message send successfully" })
    } catch (error) {
        res.status(400).json({ error, })
    }
})

export { messagesRouter }