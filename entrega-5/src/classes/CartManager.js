//Adding fs
import fs from 'fs'
//Class Creation
export class CartManager {
    //Properties
    path
    #id
    #carts
    //Constructor
    constructor() {
        this.path = '../data/carts.json'
        this.#id = 1
        this.#carts = []
        if (fs.existsSync(this.path)) {
            this.getCarts().then(() => {
                if (this.#carts.length >= 1) {
                    this.#id = this.#carts[this.#carts.length - 1].id + 1
                }
            }
            )
        }
        else {
            fs.writeFileSync(this.path, '[\n]')
        }
    }
    //Other Methods
    async getCarts() {
        return this.#carts = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
    }
    async getProductsById(id) {
        await this.getCarts()
        return this.#carts.find(cart => cart.id === id).products ?? `No existe un carrito con el id: ${id}`
    }
    async #writeFile() {
        let arrayJSON = '[\n'
        for (let i = 0; i < this.#carts.length; i++) {
            arrayJSON += '\t' + JSON.stringify(this.#carts[i])
            if (i != this.#carts.length - 1) {
                arrayJSON += ','
            }
            arrayJSON += '\n'
        }
        arrayJSON += ']'
        await fs.promises.writeFile(this.path, arrayJSON)
    }
    async addCart(products) {
        await this.getCarts()
        this.#carts.push({
            id: this.#id++,
            products: products || []
        })
        await this.#writeFile()
        return "Carrito añadido con éxito"
    }
    async addProduct(id, productId) {
        await this.getCarts()
        const returnIndexResult = await this.returnIndex(id)
        let message
        if (returnIndexResult != -1) {
            const productIndex = this.#carts[returnIndexResult].products.findIndex(product => product.productId === productId)
            if (productIndex != -1) {
                this.#carts[returnIndexResult].products.splice(productIndex, 1, {
                    productId,
                    quantity: this.#carts[returnIndexResult].products[productIndex].quantity + 1
                })
                message = `El producto ya existía, quantity es ahora: ${this.#carts[returnIndexResult].products[productIndex].quantity}`
            }
            else {
                this.#carts[returnIndexResult].products.push({
                    productId,
                    quantity: 1
                })
                message = "Producto añadido con éxito"
            }
            await this.#writeFile()
            return message
        }
        return `No se encontró un carrito con el id ${id}`
    }
    async returnIndex(id) {
        await this.getCarts()
        return this.#carts.findIndex(cart => cart.id === id)
    }
}