import mongoose from "mongoose";
import { userModel } from "./models/user.js";

mongoose.connect('mongodb+srv://rbarone:coder2023@cluster0.shlkah8.mongodb.net/ecommerce?retryWrites=true&w=majority')

export const getAll = async () => {
    let result
    try {
        result = await userModel.find()
    } catch (error) {
        console.log(error)
    }

    return result;
}

export const getByEmail = async (email) => {
    let result
    try {
        result = await userModel.findOne({ email })
    } catch (error) {
        console.log(error)
    }

    return result;
}

export const getById = async (id) => {
    let result
    try {
        result = await userModel.findOne({ _id: id })
    } catch (error) {
        console.log(error)
    }

    return result;
}

export const createUser = async (user) => {
    let result
    try {
        result = await userModel.create(user)
    } catch (error) {
        console.log(error)
    }

    return result;
}

export const updateUserPassword = async (email, newPassword) => {
    let result
    try {
        result = await userModel.updateOne({ email: email }, { $set: { password: newPassword } })
    } catch (error) {
        console.log(error)
    }
    return result;
}