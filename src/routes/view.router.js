import { Router } from 'express'
import productManager from '../DAO/productManager.js';
import dbChatManager from '../DAO/chat.DAO.js';


const viewRouter = Router();
// const manager = new productManager();
const chatManager = new dbChatManager();

viewRouter.get('/chat', async (req, res) => {
    res.render('chat')
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