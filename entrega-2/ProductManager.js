const fs = require('fs')
class ProductManager {
    path
    #id
    #products
    constructor() {
        this.path = './products.json'
        const createFile = async () => {
            await fs.promises.writeFile(this.path)
        }
        createFile()
        this.#id = 1
        this.#products = []
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        this.getProducts()
        let required = typeof (title) == "string"
        required = required && (typeof (description) == "string")
        required = required && (typeof (price) == "number")
        required = required && (typeof (thumbnail) == "string")
        required = required && (typeof (code) == "number")
        required = required && (typeof (stock) == "number")
        if (required) {
            if (this.#products.findIndex(product => product.code === code) == -1) {
                this.#products.push({
                    id: this.#id++,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                })
                this.#writeFile()
            }
            else {
                console.error("Ya existe un producto con este valor de code")
            }
        }
        else {
            console.error("Todos los campos son requeridos y deben ser del tipo correcto")
        }

    }
    async getProducts() {
        this.#products = await fs.promises.readFile(this.path).map(JSON.parse)
        return this.#products
    }
    getProductById(id) {
        this.getProducts()
        return this.#products.find(product => product.id === id) ?? `No existe un producto con el id: ${id}`
    }
    deleteProduct(id) {
        const findIndexResult = this.findIndex(id)
        if (findIndexResult != -1) {
            this.#products.splice(findIndexResult,1)
            this.#writeFile()
        }   
    }
    findIndex(id){
        this.getProducts()
        return this.#products.findIndex(product => product.id === id)
    }
    updateProduct(id, content) {
        this.getProducts()
        const findIndexResult = this.findIndex(id)
        if (findIndexResult != -1) {
            this.#products.splice(findIndexResult,1,{
                id: id,
                title: content.title,
                description: content.description,
                price: content.price,
                thumbnail: content.thumbnail,
                code: content.code,
                stock: content.stock
            })
            this.#writeFile()
        }
    }
    async #writeFile(){
        await fs.promises.writeFile(this.path, this.#products.map(JSON.stringify))
    }
}
export { ProductManager }