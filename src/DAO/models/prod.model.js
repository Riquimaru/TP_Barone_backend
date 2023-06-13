import mongoose from "mongoose";

const prodCollection = 'products'

const prodSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number, 
    thumbnail: String,
    stock: Number
})

export const prodModel = mongoose.model(prodCollection, prodSchema);