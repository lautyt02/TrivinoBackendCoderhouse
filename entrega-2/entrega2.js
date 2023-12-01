//Creacion de objeto perteneciente a ProductManager
const myProductManager = new ProductManager()
//Agregado de varios Productos
myProductManager.addProduct("Tux", "mascota del SO Linux", 5000, '/images/tux.png', 1500, 9999)
myProductManager.addProduct("Pop_OS", "Distro Linux Desarrollada por System76", 10000, '/images/popos.png', 1600, 1000)
myProductManager.addProduct("Linux Mint", "Distro Linux de desarrollo comunitario", 10000, '/images/popos.png', 1700, 1500)
myProductManager.addProduct("The Unlicense", "Licencia para ceder tu código/contribuciones al Dominio Público", 10000, '/images/popos.png', 2000, 1)
//Intentar agregar un elemento sin todos los parametros
myProductManager.addProduct('', "mascota del SO Linux", 0, '/images/tux.png', 1550)
//Intentar agregar un elemento con un code existente
myProductManager.addProduct("Tux 3", "mascota del SO Linux", 5000, '/images/tux.png', 1500, 9999)
console.log(myProductManager.getProducts())
//Buscar producto por id
console.log(myProductManager.getProductById(3))
//Buscar producto por id inexistente
console.log(myProductManager.getProductById(1000))