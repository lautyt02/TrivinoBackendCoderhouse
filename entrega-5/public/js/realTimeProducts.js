const socket = io()
const productsList= document.getElementById("productsList")
socket.on('updateClients', updatedProducts =>{
    let content = ``
    for(const proyecto of updatedProducts){
        content += `<h2>${proyecto.title}</h2>
        <p>${proyecto.description}</p>
        <br>
        <p>price: ${proyecto.price}</p>
        <p>category: ${proyecto.category}</p>
        <p>stock: ${proyecto.stock}</p>
        <hr>
        `
    }
    productsList.innerHTML=content
    console.log(updatedProducts)
    console.log('clients updated')
})