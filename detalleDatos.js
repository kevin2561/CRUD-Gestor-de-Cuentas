function detalleDatos() {
    let btnRegresar = document.getElementById("btn-regresar");
    let fomularioFiltarDatos = document.getElementById("formulario-filtrar-datos");
    let formularioFilterAño = document.getElementById("formularioFilterAño");
    let formularioUpdate = document.getElementById("formUpdate");
    let formularioDelete = document.getElementById("formDelete");


    function convinar() {
        let paginaMain = "index.html";
        fetch(paginaMain)
            .then(responsive => responsive.text())
            .then(data => {
                document.body.innerHTML = data
                detalleDatos()
            })
    }

    function traerDatos(event) {


        event.preventDefault()

        let dataFrom = new FormData(event.currentTarget)

        let formdata = new FormData()
        formdata.append("mes", dataFrom.get("filtrar-mes").toLowerCase())
        formdata.append("año", dataFrom.get("filtrar-año"))
        let url = "http://localhost/sistemasCuentas/consultarMesyA%c3%b1o.php"
        fetch(url, {
            method: "POST",
            body: formdata
        })
            .then(response => response.json())
            .then(data => {
                //  console.log(data)
                llenarTabla(data, true)
                limpiarInputFilter()


            })


    }


    function traerDatosAños(event) {
        let inputSoloAño = document.getElementById("input-solo-año");


        event.preventDefault()





        let dataformulario = new FormData(event.currentTarget)
        let formdata = new FormData()
        formdata.append("año", dataformulario.get("filtrarAño"))

        let url = "http://localhost/sistemasCuentas/consultarA%c3%b1o.php";
        fetch(url, {
            method: "POST",
            body: formdata
        })
            .then(response => response.json())
            .then(dataAño => {
                llenarTabla(dataAño, false)
                inputSoloAño.value = ""

            })


    }



    function llenarTabla(data, mostrarMesYAno) {
        let tbody = document.getElementById("tbody-datos")
        let h1MesAño = document.getElementById("mes-año")
        let mesTotal = document.getElementById("totalMes")
        let totalMes = 0
        let indice = 1

        let fila = "<tr>"
        data.map(item => {
            fila += "<td class='text-break'>" + indice++ + "</td>"
            fila += "<td class='text-break'>" + item.id + "</td>"
            fila += "<td class='text-break' title='" + item.descripcion + "'>" + item.descripcion + "</td>"
            fila += "<td class='text-start' title='" + item.fecha + "'>" + item.fecha + "</td>"
            fila += "<td class='text-start'>" + "S/" + parseInt(item.precio).toFixed(2) + "</td>"
            fila += "<td class='text-center' title='Editar' >" + "<i id='btn-actualizar' class='bi bi-pencil-square iconos' data-bs-toggle='modal' data-bs-target='#updateModal' ></i>" + "</td>"
            fila += "<td class='text-center' title='Eliminar' >" + "<i id='btn-eliminar' class='bi bi-x-circle-fill iconos' data-bs-toggle='modal' data-bs-target='#deleteModal'></i>" + "</td>"
            fila += "<tr>"

            if (mostrarMesYAno) {
                h1MesAño.innerText = item.mes + ": " + item.año;
            } else {
                h1MesAño.innerText = "Año: " + item.año;
            }
            totalMes += parseInt(item.precio)
            mesTotal.innerText = "S/" + totalMes.toFixed(2)
            tbody.innerHTML = fila



        })

        let tbodyPintar = document.querySelectorAll("#tbody-datos tr ")
        tbodyPintar.forEach(element => {
            element.addEventListener("mouseenter", function (e) {
                e.target.classList.add("table-danger")
            })

            element.addEventListener("mouseleave", function (e) {
                e.target.classList.remove("table-danger")
            })

        })

        let btnActualizar = document.querySelectorAll("#btn-actualizar");
        for (let i = 0; i < btnActualizar.length; i++) {
            btnActualizar[i].addEventListener("click", function () {
                // console.log(data[i].id)
                formularioUpdate.elements["id"].value = data[i].id
                formularioUpdate.elements["descripcion"].value = data[i].descripcion
                formularioUpdate.elements["fecha"].value = data[i].fecha
                formularioUpdate.elements["mes"].value = data[i].mes
                formularioUpdate.elements["año"].value = data[i].año
                formularioUpdate.elements["precio"].value = data[i].precio

            })

        }


        let codigoRegistro = document.getElementById("codigo-registro");
        let btnEliminar = document.querySelectorAll("#btn-eliminar")
        for (let i = 0; i < btnEliminar.length; i++) {
            btnEliminar[i].addEventListener("click", function () {
                formularioDelete.elements["id"].value = data[i].id
                codigoRegistro.innerText = data[i].id

            })

        }
    }



    function limpiarInputFilter() {
        let inputFiltrarMes = document.getElementById("input-filtrar-mes");
        let inputFiltrarAño = document.getElementById("input-filtrar-año");
        inputFiltrarMes.value = ""
        inputFiltrarAño.value = ""
    }


    async function updateRegistro(event) {
        event.preventDefault();
        let datafrom = new FormData(event.currentTarget)
        let formdata = new FormData()
        formdata.append("id", datafrom.get("id"));
        formdata.append("descripcion", datafrom.get("descripcion"));
        formdata.append("fecha", datafrom.get("fecha"));
        formdata.append("precio", datafrom.get("precio"));
        formdata.append("mes", datafrom.get("mes").toLowerCase());
        formdata.append("año", datafrom.get("año"));

        let url = "http://localhost/sistemasCuentas/updaterecord.php"
        const response = await fetch(url, {
            method: "POST",
            body: formdata
        })


    }

    async function deleteRegistro(event) {
        event.preventDefault();
        let datafrom = new FormData(event.currentTarget)
        let formdata = new FormData()
        let x = datafrom.get("id")
        formdata.append("id", datafrom.get("id"));
        console.log(x)

        let url = "http://localhost/sistemasCuentas/DeleteRegistro.php"
        const response = await fetch(url, {
            method: "POST",
            body: formdata
        })

    }



    btnRegresar.addEventListener("click", convinar);
    fomularioFiltarDatos.addEventListener("submit", (event) => traerDatos(event));
    formularioFilterAño.addEventListener("submit", (event) => traerDatosAños(event));

    formularioUpdate.addEventListener("submit", (event) => updateRegistro(event))
    formularioDelete.addEventListener("submit", (event) => deleteRegistro(event));


}
detalleDatos()


