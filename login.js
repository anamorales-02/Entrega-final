let buscarNombre = localStorage.getItem('nombre');
let buscarContraseña = localStorage.getItem('contraseña');


let almacenarDatos = { id: inicioSesion, nombre: nombre.value, contraseña: contraseña.value, }
localStorage.setItem('Datos' + inicioSesion, JSON.stringify(almacenarDatos))

let usuarioActivo = localStorage.getItem('usuarioActivo')
usuarioActivo = JSON.parse(usuarioActivo);
if(usuarioActivo != null){
    location.href = "/.vs/Curso%20JS/v16/index.html"
}
button.addEventListener('click', (e) => {
    e.preventDefault()
    const data = {
        nombre: nombre.value,
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
        let listaUsuario = localStorage.getItem("Datos");
        listaUsuario = JSON.parse(listaUsuario);
        let datosCorrectos = false;
        let i = 0;
        let cantidad = listaUsuario.length; //obtengo cantidad de usuarios
        let iterar = true;
        while (i < cantidad && iterar) {
            let usuario = listaUsuario[i];
            if (usuario.nombre == nombre.value && usuario.contraseña == contraseña.value) {
                datosCorrectos = true;
                iterar = false;
                localStorage.setItem('usuarioActivo', JSON.stringify(data))
            }
            i++;
        }
        if (datosCorrectos) {
            location.href = "/.vs/Curso%20JS/v16/index.html"
        } else {
            Swal.fire({
                title: "Error",
                text: "Los datos ingresados son incorrectos",
                icon: "error"
            })
        }
    }
})
