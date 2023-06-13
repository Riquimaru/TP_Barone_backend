import { prodModel } from "./models/prod.model.js";

class dbProdManager {
    constructor() {
        this.model = prodModel;
    }

    async getProducts() {
        let prod;
        try {
            prod = await this.model.find()
        } catch (error) {
            console.log(error)
        }
        return prod;
    }

    async getProductsById(id) {
        let prod;
        try {
            prod = await this.model.findOne({ _id: id })
        } catch (error) {
            console.log(error)
        }
        return prod;
    }

    async newProducts(title, description, price, stock) {
        let prod;
        try {
            prod = await this.model.create({
                title,
                description,
                price,
                stock
            })
        } catch (error) {
            console.log(error)
        }
        return prod;
    }

    async updProducts(id, data){
        let prod;
        try {
            prod = await this.model.updateOne({ _id: id}, data)
        } catch (error) {
            console.log(error)
        }
        return prod;
    }

    async delProducts(id){
        let prod;
        try {
            prod = await this.model.deleteOne({_id:id})
        } catch (error) {
            console.log(error)
        }
        return prod;
    }
}

export default dbProdManager;