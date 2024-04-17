//Imports
import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import { productsRouter } from "./routes/products.router.js"
import { cartsRouter } from "./routes/carts.router.js"
import { viewsRouter } from './routes/views.router.js'
import { usersRouter } from './routes/users.router.js'
import { port } from './configs/server.config.js'
import { messagesRouter } from './routes/messages.router.js'
import { messagesModel } from './dao/mongo/models/message.model.js'
//Config
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('../public'))
//Handlebars Config
app.engine('handlebars', handlebars.engine())
app.set('views', process.cwd() + '/views')
app.set('view engine', 'handlebars')

//Run Server
const httpServer = app.listen(port, () => console.log(`server runing at port ${port}`))
const io = new Server(httpServer)
io.on('connection', socket => {
    console.log(socket.id)
    // socket.on("login", async () => {
    //     const messages = await messagesModel.find()
    //     socket.emit('updateMessages', messages)
    // })
    socket.on('newUser', async user => {
    console.log("Se creo usuario")
    socket.broadcast.emit('newUser', user)
    const messages = await messagesModel.find()
    socket.emit('updateMessages', messages)
})
})

//Mongoose
mongoose.connect("mongodb+srv://lautarotrivino:Xx4XrIPGHHvGwlW8@codercluster.wn1eukp.mongodb.net/ecomerce?retryWrites=true&w=majority&appName=CoderCluster")
//Requests
app.use('/api/products/', productsRouter)
app.use('/api/carts/', cartsRouter)
app.use('/api/users/', usersRouter)
app.use('/api/messages/', messagesRouter)
app.use('/', viewsRouter)
export { io }