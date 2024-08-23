function mainContenedor(){


const formularioInsert = document.getElementById("formulario-insertar");
let btnHistorial = document.getElementById("btn-historial");
//let btnRegistrar = document.getElementById("btn-registrar");
let mainContenido = document.getElementById("contenido");
let txtAño = document.querySelector('input[name="txt-año"]');
txtAño.value = yearActual()



function insertarDato(event) {
    event.preventDefault();
    const dataForm = new FormData(event.currentTarget);


    let formdata = new FormData()
    formdata.append("descripcion", dataForm.get("txt-descripcion"));
    formdata.append("fecha", fechaDeHoy());
    formdata.append("precio", dataForm.get("txt-precio"));
    formdata.append("mes", dataForm.get("txt-mes").toLowerCase());
    formdata.append("año", yearActual());

    let url = "http://localhost/sistemasCuentas/insertarDatosPc.php"

    fetch(url, {
        method: "POST",
        body: formdata
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            alert("Regsitro exitoso")
            limpiarInput()
        })


}
formularioInsert.addEventListener("submit", (event) => insertarDato(event))

function fechaDeHoy() {
    let dato = new Date()
    dia = dato.getDate()
    mes = dato.getUTCMonth() + 1
    año = dato.getFullYear()
    return dia + "/" + mes + "/" + año
}
//console.log(fechaDeHoy())

function limpiarInput() {
    let txtDescripcion = document.querySelector('input[name="txt-descripcion"]');
    let txtMes = document.querySelector('input[name="txt-mes"]');
    let txtAño = document.querySelector('input[name="txt-año"]');
    let txtPrecio = document.querySelector('input[name="txt-precio"]');
    txtDescripcion.value = ""
    txtMes.value = ""
    txtPrecio.value = 0
}
function yearActual() {
    let txtAño = document.querySelector('input[name="txt-año"]');
    let dato = new Date()
    let añoAcutal = txtAño.value = dato.getFullYear()
    return añoAcutal
}
btnHistorial.addEventListener("click", function () {
    let pagina = "detalleDatos.html";
    let crearScript = document.createElement("script")
    fetch(pagina)
        .then(response => response.text())
        .then(data => {
            mainContenido.innerHTML = data
            crearScript.src="detalleDatos.js"
            document.head.appendChild(crearScript)
        })


})

}
mainContenedor()
