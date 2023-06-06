import { Router } from 'express'
import productManager from '../data/productManager.js';
import { validateP } from '../../utils/validateAddP.js';

const viewRouter = Router();
const manager = new productManager();

viewRouter.get('/hbs', (req, res) => {
    let user = {
        name: "Ricardo",
        lastname: "Barone"
    }

    res.render('index', user)
})

viewRouter.get('/home', async (req, res) => {
    let lista = await manager.getProducts()
    res.render('home', { lista })
})


viewRouter.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts')
})

let newP = []

viewRouter.post('/realtimeproducts', async (req, res) => {
    newP = req.body;
    let lista = await manager.getProducts()
    res.render('newP', {lista, newP})
    console.log(newP)
})


export default viewRouter;