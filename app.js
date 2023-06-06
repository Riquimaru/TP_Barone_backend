
import express from 'express'
import { Server } from 'socket.io'
import handlebars from 'express-handlebars'
import productRouter from './src/routes/product.js'
import cartRouter from './src/routes/cart.js'
import viewRouter from './src/routes/view.router.js'
import __dirname from './utils.js'



const app = express()
const httpServer = app.listen(8080, () => console.log('Server corriendo'))

const socketServer = new Server(httpServer)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/', viewRouter)

let newP = []

socketServer.on('connection', socket => {
    console.log('Nuevo socket conectado')

    socket.emit('show', newP)

    socket.on('add', data => {
        newP.push(data)
        socketServer.emit('show', newP)
    })

})


// const PORT = 8080;
// const server = app.listen(PORT, () => console.log(`Servidor funcionando en puerto: ${server.address().port}`))
// server.on('error', error => console.log(error))