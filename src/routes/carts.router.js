import { Router } from "express";
import dbCartManager from "../DAO/cart.DAO.js";


const cartRouters = Router();
const cartManager = new dbCartManager()


cartRouters.get('/:cid', async (req, res) => {
    let cid = req.params.cid;
    let carts;
    try {
        carts = await cartManager.getCartById(cid)
    } catch (error) {
        res.status(404).send({ status: "error", error })
    }

    res.send({ status: "success", payload: carts })
})

cartRouters.post('/', async (req, res) => {
    let cart;
    try {
        cart = await cartManager.createCart()
    } catch (error) {
        res.status(500).send({status: "error", error})
    }
    res.send({ status: "success", payload: cart })
})

cartRouters.put('/:cid', async (req, res)=>{
    let cid = req.params.cid;
    let prods = req.body;
    let cart;

    try {
        cart = await cartManager.addProdToCart(cid, prods)
    } catch (error) {
        res.status(500).send({status: "error", error})
    }
    res.send({ status: "success", payload: cart })
})

cartRouters.post('/:cid/products/:pid', async (req, res) => {
    let cid = req.params.cid
    let pid = req.params.pid
    let qty = req.body;
    let cart;

    try {
       cart = await cartManager.addProdCartQty(cid, pid, qty)
    } catch (error) {
        res.status(500).send({status: "error", error})
    }
    res.send({ status: "success", payload: cart })
})

cartRouters.delete('/:cid', async(req, res)=>{
    let cid = req.params.cid;
    let cart;
    try {
        cart = await cartManager.delCartProducts(cid)
    } catch (error) {
        res.status(500).send({status: "error", error})
    }
    res.send({status:"success", payload: cart})
})

cartRouters.delete('/:cid/products/:pid', async(req, res)=>{
    let cid = req.params.cid;
    let pid = req.params.pid
    let cart;
    try {
        cart = await cartManager.delCartProduct(cid, pid)
    } catch (error) {
        res.status(500).send({status: "error", error})
    }
    res.send({status:"success", payload: cart})
})



export default cartRouters;