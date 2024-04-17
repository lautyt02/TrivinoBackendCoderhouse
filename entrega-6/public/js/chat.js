const socket = io()
let bienvenida = document.getElementById("bienvenida")
let chatBox = document.getElementById("chatBox")
let messageLogs = document.getElementById("messageLogs")
let user = {}
Swal.fire({
    title: "Login/Register",
    input: "text",
    text: "Ingrese su dirección de correo",
    inputValidator: (value) => {
        return !value && "Se requiere una dirección de correo para continuar"
    },
    allowOutsideClick: false
}).then(async mail => {
    const response = await (await fetch(`http://localhost:8080/api/users/${mail.value}`)).json()
    if (response.length == 0) {
        user.email = mail.value
        Swal.fire({
            title: "Nombre",
            input: "text",
            text: "Ingrese su nombre",
            inputValidator: (value) => {
                return !value && "Se requiere un nombre para continuar"
            },
            allowOutsideClick: false
        }).then(name => {
            user.firstName = name.value
            Swal.fire({
                title: "Apellido",
                input: "text",
                text: "Ingrese su apellido",
                inputValidator: (value) => {
                    return !value && "Se requiere un apellido para continuar"
                },
                allowOutsideClick: false
            }).then(lastNameResp => {
                user.lastName = lastNameResp.value
            }).then(async () => {
                await fetch("http://localhost:8080/api/users/", {
                    method: "POST",
                    body: JSON.stringify(user),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                socket.emit("newUser", user)
                bienvenida.innerHTML = `Hola ${user.firstName}`
            })
        }
        )
    }
    else {
        user = response[0]
        // socket.emit("login")
        bienvenida.innerHTML = `Hola ${user.firstName}`
    }
})
chatBox.addEventListener('keyup', async evt => {
    if (evt.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            await fetch("http://localhost:8080/api/messages/", {
                method: "POST",
                body: JSON.stringify({
                    user: user.email,
                    message: chatBox.value
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            chatBox.value = ""
        }
    }
})
socket.on('newUser', user => {
    console.log("new User")
    Swal.fire({
        text: `${user.email} se unió al chat`,
        toast: true,
        position: "top-right"
    })
})
socket.on('updateMessages', messages => {
    console.log("updating MEssages")
    console.log(messages)
    let content = ``
    for (const message of messages) {
        content += `<h4>${message.user}</h2>
        <p>${message.message}</p>
        <hr>
        `
    }
    messageLogs.innerHTML = content
})