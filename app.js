
import express from 'express'
import productRouter from './src/routes/product.js'
import cartRouter from './src/routes/cart.js'



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)

const PORT = 8080;
const server = app.listen(PORT, () => console.log(`Servidor funcionando en puerto: ${server.address().port}`))
server.on('error', error => console.log(error))