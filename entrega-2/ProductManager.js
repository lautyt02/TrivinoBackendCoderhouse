const fs = require('fs')
class ProductManager {
    path
    #id
    #products
    constructor() {
        this.#id = 1
        this.#products = []
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        let required = typeof (title) == "string"
        required = required && (typeof (description) == "string")
        required = required && (typeof (price) == "number")
        required = required && (typeof (thumbnail) == "string")
        required = required && (typeof (code) == "number")
        required = required && (typeof (stock) == "number")
        if (required) {
            this.#products.findIndex(product => product.code === code) == -1 ? this.#products.push({
                id: this.#id++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }) : console.error("Ya existe un producto con este valor de code")
        }
        else {
            console.error("Todos los campos son requeridos y deben ser del tipo correcto")
        }

    }
    getProducts() {
        return this.#products
    }
    getProductById(id) {
        return this.#products.find(product => product.id === id) ?? `No existe un producto con el id: ${id}`
    }
    deleteProduct(id){

    }
    updateProduct(id,content){

    }
}
export {ProductManager}