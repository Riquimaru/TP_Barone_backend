
import express from 'express'
import { Server } from 'socket.io'
import handlebars from 'express-handlebars'
import productRouters from './src/routes/product.js'
import cartRouter from './src/routes/cart.js'
import viewRouter from './src/routes/view.router.js'
import __dirname from './utils.js'
import productRouter from './src/routes/products.router.js'
import cartRouters from './src/routes/carts.router.js'
import dbChatManager from './src/DAO/chat.DAO.js'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import sessionRouter from './src/routes/session.js'



const app = express()
const httpServer = app.listen(8080, () => console.log('Server corriendo'))
const socketServer = new Server(httpServer)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// mongoose.connect('mongodb+srv://rbarone:coder2023@cluster0.shlkah8.mongodb.net/ecommerce?retryWrites=true&w=majority')
//     .then(() => console.log('Conectado'))
//     .catch(err => console.log(err))

app.use('/api/product', productRouters) //FS
app.use('/api/cart', cartRouter) //FS
app.use('/', viewRouter) // HBS /chat
app.use('/mongo/product', productRouter) // Mongoose para productos
app.use('/mongo/cart', cartRouters) // Mongoose para carrito
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://rbarone:coder2023@cluster0.shlkah8.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 3600
    }),
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}))
app.use('/api/session', sessionRouter)

const chatManager = new dbChatManager();

let mensajes = [];

socketServer.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    socket.emit('messages', mensajes)

    socket.on('message', async (usr, msg) => {
        mensajes.push(msg)
        let chatDB;
        try {
            chatDB = await chatManager.createMSG(usr, msg)
        } catch (error) {
            console.log(error)
        }

        socketServer.emit('messages', mensajes)
    })
})


// const PORT = 8080;
// const server = app.listen(PORT, () => console.log(`Servidor funcionando en puerto: ${server.address().port}`))
// server.on('error', error => console.log(error))