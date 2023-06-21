import { prodModel } from "./models/prod.model.js";

class dbProdManager {
    constructor() {
        this.model = prodModel;
    }

    async getProducts() {
        let prod;
        try {
            prod = await this.model.find().lean()
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

    async getProductsByQuery(query, order) {
        let prod;
        console.log(query)
        console.log(order)
        try {
            if (order) {
                prod = await this.model.aggregate([
                    {
                        $match: { title: query }
                    },
                    {
                        $group: {
                            _id: '$description',
                            product: { $push: "$$ROOT" } 
                        }
                    },
                    {
                        $sort: { price: 1 }
                    },
                    {
                        $project: {
                            "_id": 0,
                            product: "$product",
                            price: "$price"
                        }
                    }
                ])
            } else {
                prod = await this.model.aggregate([
                    {
                        $match: { title: query }
                    },
                    {
                        $group: {
                            _id: '$description',
                            product: { $push: "$$ROOT" } 
                        }
                    },
                    {
                        $project: {
                            "_id": 0,
                            product: "$product",
                            price: "$price"
                        }
                    }
                ]
                )
            }
        } catch (error) {
            console.log(error)
        }
        console.log(prod)
        return prod;
    }

    async newProducts(title, description, price, status, stock) {
        let prod;
        try {
            prod = await this.model.create({
                title,
                description,
                price,
                status,
                stock
            })
        } catch (error) {
            console.log(error)
        }
        return prod;
    }

    async updProducts(id, data) {
        let prod;
        try {
            prod = await this.model.updateOne({ _id: id }, data)
        } catch (error) {
            console.log(error)
        }
        return prod;
    }

    async delProducts(id) {
        let prod;
        try {
            prod = await this.model.deleteOne({ _id: id })
        } catch (error) {
            console.log(error)
        }
        return prod;
    }
}

export default dbProdManager;