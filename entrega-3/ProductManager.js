//Adding fs
const fs = require('fs')
//Class Creation
class ProductManager {
    //Properties
    path
    #id
    #products
    //Constructor
    constructor() {
        this.path = './products.json'
        fs.writeFileSync(this.path, '')
        this.#id = 1
        this.#products = []
        this.#writeFile()
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
        this.#products = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
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

//Execution
//Creacion de objeto perteneciente a ProductManager
const myProductManager = new ProductManager()
const tareasAsincronas = async () => {
    // Agregado de varios Productos
    await myProductManager.addProduct("Tux", "mascota del SO Linux", 5000, '/images/tux.png', 1500, 9999)
    await myProductManager.addProduct("Pop_OS", "Distro Linux Desarrollada por System76", 10000, '/images/popos.png', 1600, 1000)
    await myProductManager.addProduct("Linux Mint", "Distro Linux de desarrollo comunitario", 10000, '/images/popos.png', 1700, 1500)
    await myProductManager.addProduct("The Unlicense", "Licencia para ceder tu código/contribuciones al Dominio Público", 10000, '/images/popos.png', 2000, 1)
    //Intentar agregar un elemento sin todos los parametros
    await myProductManager.addProduct('', "mascota del SO Linux", 0, '/images/tux.png', 1550)
    //Intentar agregar un elemento con un code existente
    await myProductManager.addProduct("Tux 3", "mascota del SO Linux", 5000, '/images/tux.png', 1500, 9999)
    //Buscar producto por id
    console.log('buscar por id')
    console.log(await myProductManager.getProductById(3))
    //Buscar producto por id inexistente
    console.log(await myProductManager.getProductById(1000))
    //Eliminar Producto
    await myProductManager.deleteProduct(2)
    //Actualizar Producto
    await myProductManager.updateProduct(1, { title: "Tux modificado", description: "mascota del SO Linux", price: 5000, thumbnail: "/images/tux.png", code: 1500, stock: 9999 },)
}
tareasAsincronas()
