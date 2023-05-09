
import express from 'express'
import productManager from './TP_Barone.js';


const app = express()
app.use(express.urlencoded({ extended: true }))

const manager = new productManager();

app.get('/', (req, res) => {
    res.send('Bienvenido')
})

app.get('/products', async (req, res) => {
    let limit = req.query.limit;
    let lista = await manager.getProducts()
    if (limit > 0) {
        let newLista = lista.filter(i => i.code <= limit)
        return res.send(newLista)
       }
    return res.send(lista)
    })

app.get('/products/:id', async (req, res)=>{
    let id = req.params.id;
    let lista = await manager.getProductById(id)
    if (lista){
    res.send(lista)
}else{
    res.send('ID no existente')
}

})

const server = app.listen(8080, () => console.log("Running on 8080"));