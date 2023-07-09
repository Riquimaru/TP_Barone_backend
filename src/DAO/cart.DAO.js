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
        console.log(cart)
        return cart;
    }


    async createCart() {
        let cart;
        try {
            cart = await this.model.create({
            })
        } catch (error) {
            console.log(error)
        }
        return cart;
    }

    async addProdToCart(id, prod) {
        let cartid;
        try {
            cartid = await this.model.findOne({ _id: id })
            if (cartid) {
                cartid.products.push({ product: prod })
                cartid.products.quantity++;
                let upd = await this.model.updateOne({ _id: id }, cartid)
                let cartup = await this.model.find({ _id: id }).populate('products.product')
                console.log(cartup)
                return cartup;
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addProdCart(id, prod) {
        let cart;
        try {
            cart = await this.model.updateOne({ _id: id }, { set: { products: prod } })
        } catch (error) {
            console.log(error)
        }
        return cart
    }

    async addProdCartQty(id, pid, qty) {
        let cart;
        try {
            cart = await this.model.updateOne({ _id: id }, { $set: { products: pid } }, { quantity: qty })
        } catch (error) {
            console.log(error)
        }
        try {

        } catch (error) {

        }
    }

    async delCartProducts(id) {
        let cart;
        let totalprod;
        try {
            cart = await this.model.findOne({ _id: id })
            totalprod = cart.products.length;
            cart.products.splice(0, totalprod)
            let upd = await this.model.updateOne({ _id: id }, cart)
        } catch (error) {
            console.log(error)
        }
        return cart;
    }

    async delCartProduct(id, prod) {
        let cart;
        let prodfound;
        try {
            cart = await this.model.findOne({ _id: id })
            prodfound = cart.products.indexOf(prod)
            if (prodfound) {
                cart.products.splice(prodfound, 1)
            }
            let upd = await this.model.updateOne({ _id: id }, cart)
        } catch (error) {
            console.log(error)
        }
        console.log(cart)
        return cart;
    }

}

export default dbCartManager;