//Adding fs
import fs from 'fs'
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
            this.getProducts().then(() => {
                if (this.#products.length >= 1) {
                    this.#id = this.#products[this.#products.length - 1].id + 1
                }
            }
            )
        }
        else {
            fs.writeFileSync(this.path, '[\n]')
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
    validateFields(title, description, code, price, stock, category) {
        let required = typeof (title) == "string"
        required = required && (typeof (description) == "string")
        required = required && (typeof (code) == "string")
        required = required && (typeof (price) == "number")
        required = required && (typeof (stock) == "number")
        required = required && (typeof (category) == "string")
        return required
    }
    // //Required by exercise
    async addProduct(title, description, code, price, stock, category, thumbnails) {
        await this.getProducts()
        const required = this.validateFields(title, description, code, price, stock, category)
        if (required) {
            if (this.#products.findIndex(product => product.code === code) == -1) {
                this.#products.push({
                    id: this.#id++,
                    title,
                    description,
                    code,
                    price,
                    status: true,
                    stock,
                    category,
                    thumbnails: thumbnails || ['']
                })
                await this.#writeFile()
                return "Producto añadido con éxito"
            }
            else {
                return "Ya existe un producto con este valor de code"
            }
        }
        return "Todos los campos (exceptuando thumbnails) son requeridos y deben ser del tipo correcto"
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
                title: content.title || this.#products[returnIndexResult].title,
                description: content.description || this.#products[returnIndexResult].description,
                code: content.code || this.#products[returnIndexResult].code,
                price: content.price || this.#products[returnIndexResult].price,
                status: content.status || this.#products[returnIndexResult].status,
                stock: content.stock || this.#products[returnIndexResult].stock,
                category: content.category || this.#products[returnIndexResult].category,
                thumbnails: content.thumbnails || this.#products[returnIndexResult].thumbnails
            })
            await this.#writeFile()
            return "Producto modificado con éxito"
        }
        return `No se encontró un producto con el id ${id}`
    }
    async deleteProduct(id) {
        const returnIndexResult = await this.returnIndex(id)
        if (returnIndexResult != -1) {
            this.#products.splice(returnIndexResult, 1)
            await this.#writeFile()
            return "Producto eliminado con éxito"
        }
        return `No se encontró un producto con el id ${id}`
    }
}