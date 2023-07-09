import { Router } from 'express'
import dbProdManager from "../DAO/prod.DAO.js";
import dbCartManager from '../DAO/cart.DAO.js';
import dbChatManager from '../DAO/chat.DAO.js';


const viewRouter = Router();
const prodManager = new dbProdManager()
const chatManager = new dbChatManager();
const cartManager = new dbCartManager()

viewRouter.get('/chat', async (req, res) => {
    res.render('chat')
})

// viewRouter.get('/products', async (req, res) => {
//     let products;
//     products = await prodManager.getProducts()
//     res.render('products', { products })
// })

viewRouter.get('/carts/:cid', async (req, res) => {
    let cid = req.params.cid;
    let carts;
    carts = await cartManager.getCartById(cid)
    res.render('carts', { carts })
})

// viewRouter.get('/hbs', (req, res) => {
//     let user = {
//         name: "Ricardo",
//         lastname: "Barone"
//     }

//     res.render('index', user)
// })

// viewRouter.get('/home', async (req, res) => {
//     let lista = await manager.getProducts()
//     res.render('home', { lista })
// })


// viewRouter.get('/realtimeproducts', (req, res) => {
//     res.render('realtimeproducts')
// })

// let newP = []

// viewRouter.post('/realtimeproducts', async (req, res) => {
//     newP = req.body;
//     let lista = await manager.getProducts()
//     res.render('newP', { lista, newP })
//     console.log(newP)
// })


export default viewRouter;