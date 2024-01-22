//Imports
import express from 'express'
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import { productsRouter } from "./routes/products.router.js"
import { cartsRouter } from "./routes/carts.router.js"
import { viewsRouter } from './routes/views.router.js'
import {port} from './configs/server.config.js'
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
io.on('connection', socket =>{
    console.log(socket.id)
})
// io.sockets.on('updateServer', updatedProducts =>{
//     console.log("Server updated")
//     io.emit('updateClients',updatedProducts)
// })
//Requests
app.use('/api/products/', productsRouter)
app.use('/api/carts/', cartsRouter)
app.use('/', viewsRouter)
export {io}