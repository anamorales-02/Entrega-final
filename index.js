
const submit = document.getElementById('submit')
const mostrarCreditos = document.getElementById('show-table-button')
let creditoActual = localStorage.setItem('creditoActual', 1)
// Obtener una referencia al elemento "span" del nombre de usuario
let usernameSpan = document.getElementById("username");
// Actualizar el contenido del elemento
let usuarioActivo = localStorage.getItem('usuarioActivo')
usuarioActivo = JSON.parse(usuarioActivo);
if(usuarioActivo == null){
    location.href = "/.vs/Curso%20JS/v16/registro.html"
}
usernameSpan.innerHTML = usuarioActivo.nombre;
submit.addEventListener('click', (e) => {
    e.preventDefault()
    const cantidadprestamos = document.getElementById('cantidadprestamos')
    let cantidad = cantidadprestamos.value
    let guardarCantidad = localStorage.setItem('cantidadprestamos_'+usuarioActivo.nombre, cantidad)

    console.log(cantidad)
    const cantidades = document.getElementById('cantidades')
    cantidades.classList.add("oculto");

    let numerodecredito = document.getElementById('numerodecredito')
    let creditoActual = localStorage.getItem('creditoActual')
    numerodecredito.innerHTML = "Credito " + creditoActual + " de " + cantidad

    const credito = document.getElementById('credito')
    credito.classList.remove("oculto");

})

const submit1 = document.getElementById('submit1')

submit1.addEventListener('click', (e) => {
    e.preventDefault()
    const montodelcredito = document.getElementById('montodelcredito')
    const cuotasapagar = document.getElementById('cuotasapagar')
    let creditoActual = parseInt(localStorage.getItem('creditoActual'))
    let cantidad = localStorage.getItem('cantidadprestamos_'+usuarioActivo.nombre)
 
    let credito = { id: creditoActual, monto: montodelcredito.value, cuotas: cuotasapagar.value }
    localStorage.setItem('credito_'+usuarioActivo.nombre+ "_" + creditoActual, JSON.stringify(credito))

    cuotasapagar.value = ""
    montodelcredito.value = ""
    let numerodecredito = document.getElementById('numerodecredito')
    let creditoActualIncrementado = creditoActual + 1
    
    numerodecredito.innerHTML = "Credito " + creditoActualIncrementado + " de " + cantidad
    localStorage.setItem('creditoActual', creditoActualIncrementado)

    if (creditoActual == cantidad) {
        mostrarTabla()
    }
})

const cerrarSesion = document.getElementById('logout-button')

cerrarSesion.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.removeItem('usuarioActivo');
    location.href = "/.vs/Curso%20JS/v16/login.html"

})



function mostrarTabla(){
    let cantidad = localStorage.getItem('cantidadprestamos_'+usuarioActivo.nombre)
    const tabla = document.getElementById('tabla')
    if(!tabla.classList.contains("oculto")){
        return;
    }
    const credito = document.getElementById('credito')
    credito.classList.add("oculto");
    let i = 0;
    let iterar = true;
    let montototal=0;
    while (i < cantidad) {
        i++;
        let credit = localStorage.getItem('credito_'+usuarioActivo.nombre+ "_" + i)

        tabla.classList.remove("oculto");
        let row = tabla.insertRow();
        let monto = row.insertCell(0);
        monto.innerHTML = JSON.parse(credit).monto
        montototal=montototal+parseInt(JSON.parse(credit).monto)
        let cuotas = row.insertCell(1);
        cuotas.innerHTML = JSON.parse(credit).cuotas
        let total = row.insertCell(2);
        total.innerHTML = JSON.parse(credit).monto / JSON.parse(credit).cuotas

    }
    const host = 'api.frankfurter.app';
    console.log("EUR");
    console.log(montototal);
    fetch(`https://${host}/latest?amount=${montototal}&from=USD&to=EUR`)
      .then(resp => resp.json())
      .then((data) => {
        console.log("EUR");
        console.log(data.rates.EUR);
        const tabla = document.getElementById('total')
        tabla.innerHTML="Deuda total : EUR: "+ data.rates.EUR + "   USD:" +montototal
      });

}

mostrarCreditos.addEventListener('click', (e) => {
    e.preventDefault()
    const cantidades = document.getElementById('cantidades')
    cantidades.classList.add("oculto");
    mostrarTabla()

})