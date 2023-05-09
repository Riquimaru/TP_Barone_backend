import fs from 'fs'

class productManager {
    constructor() {
        this.path = 'productos.json'
    }

    newId(newCode) {
        return newCode + 1;
    }

    async addProduct(title, description, price, thumbnail, stock) {
        if (!title || !description || !price || !thumbnail || !stock) {
            return console.log("Se deben llenar todos los campos")
        } else {
            let file = await fs.promises.readFile(this.path)
            let products = JSON.parse(file)
            let newCode = products.length

            let newProduct = {
                title,
                description,
                price,
                thumbnail,
                code: this.newId(newCode),
                stock
            }

            products.push(newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return console.log("Producto Agregado")
        }

    }

    async getProducts() {
        let file = await fs.promises.readFile(this.path)
        let products = JSON.parse(file)
        return products;
    }

    async getProductById(id) {
        let file = await fs.promises.readFile(this.path)
        let products = JSON.parse(file)
        let idFound = products.find(p => p.code == id)
        if (idFound) {
            return idFound;
        } else {
            return console.log('No se encontró ID')
        }
    }

    async updateProduct(id, objProd) {
        let file = await fs.promises.readFile(this.path)
        let products = JSON.parse(file)
        let prodSearch = products.findIndex(p => p.code == id)
        if (prodSearch >= 0) {
            products[prodSearch] = objProd
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return console.log("Producto actualizado: ", await this.getProductById(id))
        } else {
            return console.log("No se encontró el producto")
        }

    }

    async deleteProduct(id) {
        let file = await fs.promises.readFile(this.path)
        let products = JSON.parse(file)
        let prodSearch = products.findIndex(p => p.code == id)
        if (prodSearch >= 0) {
            products.splice(prodSearch, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return console.log('Se encontró y eliminó el producto, se muestra la lista actualizada: ', await this.getProducts())
        } else {
            return console.log("Producto no encontrado")
        }
    }

}


// Ir descomentando según la necesidad de probar las funciones

let product = new productManager()


//Productos

// producto 1
//product.addProduct('Figura', 'figura Saki', 80000, 'Saki.jpg', 5)

// producto 2
//product.addProduct('Figura', 'figura Nodoka', 85000, 'Nodoka.jpg', 3)

//producto 3
//product.addProduct('Figura', 'figura Hisa', 75000, 'Hisa.jpg', 4)

// producto 4
//product.addProduct('Figura', 'figura Mako', 90000, 'Mako.jpg', 1)


//Se actualiza el producto en el segundo índice
// let produpd2 = {
//     title: 'Figura',
//     description: 'Figura Nodoka',
//     price: 95000,
//     thumbnail: 'Nodoka2.jpg',
//     stock: 4
// }

// let updProd = await product.updateProduct('2', produpd2)
// console.log(updProd)

// Se obtiene lista de productos

// let productsGet = await product.getProducts()
// console.log(productsGet)

// Búsqueda de producto por ID

// let idGet = await product.getProductById('1')
// console.log(idGet)

// Se borra producto por ID

// let prodDel = await product.deleteProduct('1')
// console.log(prodDel)

export default productManager;