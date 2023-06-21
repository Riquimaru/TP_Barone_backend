import { cartModel } from "../DAO/models/cart.model.js";
import { prodModel } from "./models/prod.model.js";


class dbCartManager {
    constructor() {
        this.model = cartModel;
    }

    async getCartById(id) {
        let cart;
        try {
            cart = await this.model.findOne({ _id: id }).lean()
        } catch (error) {
            console.log(error)
        }
        return cart;
    }


    async createCart() {
        let cart;
        try {
            cart = await this.model.create({
                quantity: 0
            })
        } catch (error) {
            console.log(error)
        }
        return cart;
    }

    async addProdToCart(id, prod){
        let cartid;
        try {
            cartid = await this.model.findOne({ _id: id })
            if (cartid){
            cartid.products.push({product: prod})
            let upd = await this.model.updateOne({_id: id}, cartid)
            let cartup = await this.model.findOne({ _id: id}).populate('products.product')
            console.log(cartid.products.product)
            return cartup;
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addProdCart(id, prod){
        let cart;
        try {
            cart = await this.model.updateOne({_id:id}, {set: {products: prod}})
        } catch (error) {
            console.log(error)
        }
        return cart
    }

    async addProdCartQty(id, pid, qty){
        let cart;
        try {
            cart = await this.model.updateOne({_id:id}, {$set: {products: pid}}, {quantity: qty})
        } catch (error) {
            console.log(error)
        }
        try {
            
        } catch (error) {
            
        }
    }

    async delCartProducts(id) {
        let cart;
        try {
            cart = await this.model.updateOne({_id: id}, {$set: {products: []}})
        } catch (error) {
            console.log(error)
        }
        return cart;
    }

    async delCartProduct(id, prod) {
        let cart;
        let findProd;
        let del;
        try {
            cart = await this.model.findOne({_id: id})
            findProd = await cart.findOne({products: prod})
            del = await findProd.delete()

        } catch (error) {
            console.log(error)
        }
        return cart;
    }

}

export default dbCartManager;