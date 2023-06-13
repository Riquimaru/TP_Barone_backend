import { Router } from "express";
import CartManager from "../DAO/cartManager.js";

const cartRouter = Router()

let cartManager = new CartManager()

cartRouter.get('/:cid', async (req, res) => {
    let cid = req.params.cid;
    let lista = await cartManager.getCart(cid)
    if (!lista) {
        res.send('ID no existente')

    } else {
        res.send(lista)
    }

})

cartRouter.post('/', async (req, res) => {
    let cart = await cartManager.createCart()
    if (!cart) {
        res.status(400).send({ status: "error", msg: "Carrito no agregado" })
    }
    res.send({ status: 'Completado', msg: 'Carrito creado' })
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    let cid = req.params.cid
    let pid = req.params.pid
    let cart = await cartManager.addProdCart(cid, pid)
    if (!cart) {
        res.status(400).send({ status: "error", msg: "Carrito no agregado" })
    }
    res.send({ status: 'Completado', msg: 'Carrito creado' })
})

export default cartRouter;