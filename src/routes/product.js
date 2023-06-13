
import { Router } from 'express'
import productManager from '../DAO/productManager.js';
import { validateP } from '../../utils/validateAddP.js';


const productRouters = Router()

const manager = new productManager();

productRouters.get('/', async (req, res) => {
    let limit = req.query.limit;
    let lista = await manager.getProducts()
    if (limit > 0) {
        let newLista = lista.filter(i => i.code <= limit)
        return res.send(newLista)
    }
    return res.send(lista)
})

productRouters.get('/:pid', async (req, res) => {
    let pid = req.params.pid;
    let lista = await manager.getProductById(pid)
    if (!lista) {
        res.send('ID no existente')
        
    } else {
        res.send(lista)
    }

})

productRouters.post('/', async (req, res) => {
    let product = req.body;
    if (!validateP(product)) {
        res.status(400).send({ status: "error", msg: "Producto no validado" })
    } else {
        await manager.addProduct(product);
        res.send({ status: "success", msg: "Producto agregado" })
    }

})

productRouters.put('/:pid', async (req, res) => {
    let pid = req.params.pid
    let produpd = req.body
    produpd.code = pid;
    let product = await manager.updateProduct(pid, produpd)
    if (!product) {
        res.status(400).send({ status: 'error', msg: "Producto no encontrado" })
    } else {
        res.send({ status: 'completado' })
    }
})

productRouters.delete('/:pid', async (req, res) => {
    let pid = req.params.pid
    let productdel = await manager.deleteProduct(pid)
    if (!productdel) {
        res.status(400).send({ status: 'error', msg: "Producto no encontrado" })
    }
    res.send({ status: "Producto eliminado" })
})

export default productRouters;