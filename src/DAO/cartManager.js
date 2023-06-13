import fs from 'fs'

class CartManager {
    constructor() {
        this.path = 'carrito.json';
    }

    newId(newCode) {
        return newCode + 1;
    }

    async getCart(cid) {
        let file = await fs.promises.readFile(this.path)
        let carts = JSON.parse(file)
        let idFound = carts.find(p => p.id == cid)
        if (idFound) {
            return idFound;
        } else {
            return console.log('No se encontró ID')
        }
    }

    async addProdCart(cid, pid) {
        let carts = await this.getCart(cid);
        if (!carts){
            return carts;
        }
        carts.products.push(pid);
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(carts))
            return carts;
        }
        catch (error) {
            console.log(error)
            throw error;
        }


    }

    async createCart() {
        let file = await fs.promises.readFile(this.path)
        let cart = JSON.parse(file)
        let newCode = cart.length
        let newCart = {
            id: this.newId(newCode),
            products: []
        }
        cart.push(newCart)
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(cart))
            return cart;
        }
        catch (error) {
            console.log(error)
            throw error;
        }
    }
}

export default CartManager;