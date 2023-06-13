import { cartModel } from "../DAO/models/cart.model.js";


class dbCartManager {
    constructor() {
        this.model = cartModel;
    }

    async getCartById(id) {
        let cart;
        try {
            cart = await this.model.findOne({ _id: id })
        } catch (error) {
            console.log(error)
        }
        return cart;
    }


    async createCart() {
        let cart;
        try {
            cart = await this.model.create({
                products: [],
                quantity: 0
            })
        } catch (error) {
            console.log(error)
        }
        return cart;
    }

    async addProdCart(id, pid, qty){
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

}

export default dbCartManager;