//Imports
import { Router } from "express"
import { usersModel } from "../dao/mongo/models/user.model.js"
//Declaraciones
const usersRouter = Router()
//Requests

//GETs
usersRouter.get("/", async (req, res) => {
    try {
        const users = await usersModel.find()
        res.json({ users, })
    } catch (error) {
        res.status(400).json({ error, })
    }
})
usersRouter.get("/:mail", async (req, res) => {
    const mail = req.params.mail
    try {
        const user = await usersModel.find({ email: mail })
        res.json(user)
    } catch (error) {
        res.status(400).json({ error, })
    }
})

//POST
usersRouter.post("/", async (req, res) => {
    const user = await req.body
    try {
        await usersModel.create(user)
        res.json([{ message: "User added successfully" }, user])
    } catch (error) {
        res.status(400).json({ error, })
    }
})

export { usersRouter }