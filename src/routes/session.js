import { Router } from "express";
import { createUser, getAll, getByEmail } from "../DAO/session.js";
import { authMiddleware } from "../middlewares/auth.js"
import dbProdManager from "../DAO/prod.DAO.js";

const sessionRouter = Router();
const prodManager = new dbProdManager()

sessionRouter.get('/register', (req, res)=>{
    res.render('register', {})
})

sessionRouter.post('/register', async (req, res)=>{
    let user = req.body
    let userFound = await getByEmail(user.email);
    if(userFound){
        res.render('register-error', {})
    }
    let result = await createUser(user)
    console.log(result)
    res.render('login', {})
})

sessionRouter.get('/login', (req, res)=>{
    res.render('login', {})
})

sessionRouter.post('/login', async (req, res)=>{
    let user = req.body;
    let products;
    products = await prodManager.getProducts()
    let result = await getByEmail(user.email)
    if (user.password !== result.password){
        res.render('login-error', {})
    }
    console.log(result)
    req.session.user = user.email;
    res.render('products', {user: req.session.user, products})
})

sessionRouter.get('/profile', authMiddleware, async (req, res) => {
    let user = await getByEmail(req.session.user);
    res.render('datos', { user })
})

sessionRouter.get('/logout', (req, res) => {
    req.session.destroy(error => {
        res.render('login')
    })
})

export default sessionRouter;