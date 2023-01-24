// Obtener los datos del formulario
const login = document.getElementById('inicioSesion')
const nombre = document.getElementById('nombre')
const contraseña = document.getElementById('contraseña')
const button = document.getElementById('button')

const usuario = {
    nombre: nombre.value,
    contraseña: contraseña.value,
}
let usuarioActivo = localStorage.getItem('usuarioActivo')
usuarioActivo = JSON.parse(usuarioActivo);
if(usuarioActivo != null){
    location.href = "index.html"
}
button.addEventListener('click', (e) => {
    e.preventDefault()
    const data = {
        cedula: nombre.value,
        contraseña: contraseña.value
    }
    if (nombre.value === "" || contraseña.value === "") {
        Swal.fire({
            title: "Error",
            text: "Por favor, rellene todos los campos",
            icon: "error"
        });
    }
    else {
        //registro de usuaros
        let listaUsuario = localStorage.getItem("Datos");
        listaUsuario = JSON.parse(listaUsuario)
        if(listaUsuario == null) {
            listaUsuario= []

        }

        let usuarioNuevo = { nombre: nombre.value, contraseña: contraseña.value, }
        listaUsuario = listaUsuario.concat([usuarioNuevo]);

        localStorage.setItem('Datos', JSON.stringify(listaUsuario))

        nombre.value = ""
        contraseña.value = ""
        
        location.href = "index.html"
       
        //determinar el usuario activo en ese momento de listaUsuario 
        localStorage.setItem('usuarioActivo', JSON.stringify(usuarioNuevo))

    }
    
})
