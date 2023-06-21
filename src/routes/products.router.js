import { Router } from "express";
import { prodModel } from "../DAO/models/prod.model.js";
import dbProdManager from "../DAO/prod.DAO.js";

const productRouter = Router();
const prodManager = new dbProdManager()

productRouter.get('/', async (req, res) => {
    let products;
    try {
        products = await prodManager.getProducts()
    } catch (error) {
        res.status(404).send({ status: "error", error })
    }

    res.send({ status: "success", payload: products })
})

productRouter.get('/products/:query/:sort?/:limit?/:page?', async (req, res) => {
    let query = req.params.query
    let sort = req.params.sort
    let limit = req.params.limit
    let page = req.params.page
    let products;
    try {
        products = await prodManager.getProductsByQuery(query, sort)
    } catch (error) {
        res.status(404).send({ status: "error", error })
    }
    res.send({ status: "success", payload: products })
})

productRouter.get('/productid/:pid', async (req, res) => {
    let pid = req.params.pid;
    let product;
    try {
        product = await prodManager.getProductsById(pid)
    } catch (error) {
        res.status(404).send({ status: "error", error })
    }

    res.send({ status: "success", payload: product })
})

productRouter.post('/', async (req, res) => {
    let { title, description, price, status, stock } = req.body;
    let prod;
    if (!title || !description || !price || !stock) return res.send({ status: "error", error: "Falta completar valores" });
    try {
        prod = await prodManager.newProducts(title, description, price, status, stock)
    } catch (error) {
        res.status(500).send({status: "error", error})
    }
    res.send({ status: "success", payload: prod })
})

productRouter.put('/productid/:pid', async(req,res)=>{
    let {pid} = req.params;
    let {title, description, price, stock} = req.body;
    let prod;
    if (!title || !description || !price || !stock) return res.send({ status: "error", error: "Falta completar valores" });
    try {
        prod = await prodManager.updProducts(pid, {title, description, price, stock})
    } catch (error) {
        res.status(500).send({status: "error", error})
    }
    res.send({status:"success", payload: prod})
})

productRouter.delete('/productid/:pid', async(req, res)=>{
    let {pid} = req.params;
    let prod;
    try {
        prod = await prodManager.delProducts(pid)
    } catch (error) {
        res.status(500).send({status: "error", error})
    }
    res.send({status:"success", payload:prod})
})

export default productRouter;