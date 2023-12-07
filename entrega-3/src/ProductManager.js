//Adding fs
const fs = require('fs')
//Class Creation
export class ProductManager {
    //Properties
    path
    #id
    #products
    //Constructor
    constructor() {
        this.path = '../data/products.json'
        this.#id = 1
        this.#products = []
        if (fs.existsSync(this.path)) {
            this.getProducts()
        }
        else {
            fs.writeFileSync(this.path, '')
            this.#writeFile()
        }
    }
    //Other methods
    //Extras
    async returnIndex(id) {
        await this.getProducts()
        return this.#products.findIndex(product => product.id === id)
    }
    async #writeFile() {
        let arrayJSON = '[\n'
        for (let i = 0; i < this.#products.length; i++) {
            arrayJSON += '\t' + JSON.stringify(this.#products[i])
            if (i != this.#products.length - 1) {
                arrayJSON += ','
            }
            arrayJSON += '\n'
        }
        arrayJSON += ']'
        await fs.promises.writeFile(this.path, arrayJSON)
    }
    // //Required by exercise
    async addProduct(title, description, price, thumbnail, code, stock) {
        await this.getProducts()
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
                await this.#writeFile()
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
        return this.#products = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
    }
    async getProductById(id) {
        await this.getProducts()
        return this.#products.find(product => product.id === id) ?? `No existe un producto con el id: ${id}`
    }
    async updateProduct(id, content) {
        await this.getProducts()
        const returnIndexResult = await this.returnIndex(id)
        if (returnIndexResult != -1) {
            this.#products.splice(returnIndexResult, 1, {
                id: id,
                title: content.title,
                description: content.description,
                price: content.price,
                thumbnail: content.thumbnail,
                code: content.code,
                stock: content.stock
            })
            await this.#writeFile()
        }
    }
    async deleteProduct(id) {
        const returnIndexResult = await this.returnIndex(id)
        if (returnIndexResult != -1) {
            this.#products.splice(returnIndexResult, 1)
            await this.#writeFile()
        }
    }
}