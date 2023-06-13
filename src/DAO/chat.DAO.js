import { chatModel } from "./models/chat.models.js";


class dbChatManager {
    constructor() {
        this.model = chatModel;
    }

    async createMSG(user, message) {
        let chat;
        try {
            chat = await this.model.create({
                user,
                message
            })
        } catch (error) {
            console.log(error)
        }
        return chat;
    }

    async showMSG(){
        let chat;
        try {
            chat = await this.model.find()
        } catch (error) {
            console.log(error)
        }
        return chat;
    }
}



export default dbChatManager;