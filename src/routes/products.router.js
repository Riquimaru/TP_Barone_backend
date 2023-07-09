import { Router } from "express";
import dbProdManager from "../DAO/prod.DAO.js";

const productRouter = Router();
const prodManager = new dbProdManager()

productRouter.get('/all/:limit?/:page?', async (req, res) => {
    let limit = req.params.limit
    let page = req.params.page
    let products;
    let data;
    try {
        products = await prodManager.getProducts(limit, page)
        data = {
            product: products.docs,
            totalPages: products.totalPages,
            page: products.page,
            limit: products.limit,
            hasPrevPage: products.hasPrevPage,
            prevPage: products.prevPage,
            hasNextPage: products.hasNextPage,
            nextPage: products.nextPage
        }
    } catch (error) {
        res.status(404).send({ status: "error", error })
    }
    res.render('products', { data })
})

productRouter.get('/category/:query', async (req, res) => {
    let query = req.params.query
    let sort = req.params.sort
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
        res.status(500).send({ status: "error", error })
    }
    res.send({ status: "success", payload: prod })
})

productRouter.put('/productid/:pid', async (req, res) => {
    let { pid } = req.params;
    let { title, description, price, stock } = req.body;
    let prod;
    if (!title || !description || !price || !stock) return res.send({ status: "error", error: "Falta completar valores" });
    try {
        prod = await prodManager.updProducts(pid, { title, description, price, stock })
    } catch (error) {
        res.status(500).send({ status: "error", error })
    }
    res.send({ status: "success", payload: prod })
})

productRouter.delete('/productid/:pid', async (req, res) => {
    let { pid } = req.params;
    let prod;
    try {
        prod = await prodManager.delProducts(pid)
    } catch (error) {
        res.status(500).send({ status: "error", error })
    }
    res.send({ status: "success", payload: prod })
})

export default productRouter;