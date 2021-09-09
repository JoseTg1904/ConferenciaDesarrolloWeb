function mostrar(valor) {
    /*
        document: hace referencia a la pagina web cargada en el navegador

        getElementById(): obtiene el elemento html asociado al id que le pasemos por parametro

        style: accede a la propiedad style de la etiqueta html obtenida y modifica cualquier propiedad 
        perteneciente a este atributo, style es refernte al css de esa etiqueta
    */
    if (valor == 1) { document.getElementById("crear").style.display = ""; }
    else { document.getElementById("crear").style.display = "none"; }

    if (valor == 2) { 
        mostrarContactos();  
        document.getElementById("mostrar").style.display = ""; 
    } else { document.getElementById("mostrar").style.display = "none"; }
    
    if (valor == 3) { document.getElementById("editar").style.display = ""; }
    else { document.getElementById("editar").style.display = "none"; }

    if (valor == 4) { document.getElementById("eliminar").style.display = ""; }
    else { document.getElementById("eliminar").style.display = "none"; }
}

// async: funcion que puede contener await adentro de ella
async function crear(){
    // value: Retorna el valor asociado a la etiqueta
    let nombre = document.getElementById("nombre-crear").value
    let descripcion = document.getElementById("descripcion-crear").value
    let numero = document.getElementById("numero-crear").value

    /* 
        await: es un operador que "espera" por una Promise.

        Promise: es un valor que puede tardar un cierto tiempo en computarse.

        fetch: forma nativa de JavaScript de poder realizar peticiones http, esta puede tener
        varios parametros asociados 
            -> method: tipo de metodo de la peticion http, si se omite por defecto es get
            -> headers: estos son regularmente asociados con el tiepo de body que se esta enviando
            -> body: cuerpo de la peticion
        
        JSON.stringify: convierte el objeto JSON en una notación de texto para su transmision en
        la web
    */
    let peticion = await fetch("http://localhost:3000/agregarContacto", {
        method: "post",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({
            nombre: nombre,
            descripcion: descripcion,
            numero: numero
        })
    })
    let respuesta = await peticion.json()
    alert(respuesta.mensaje)

    document.getElementById("nombre-crear").value = ""
    document.getElementById("descripcion-crear").value = ""
    document.getElementById("numero-crear").value = ""
}

async function mostrarContactos() {
    let cuerpo = document.getElementById("tbody")
     //innerHTML: modifica el contenido que se encuentra como hijo de la etiqueta especificada
    cuerpo.innerHTML = "";

    let peticion = await fetch("http://localhost:3000/obtenerContactos")
    let respuesta = await peticion.json()

    for (let i = 0; i < respuesta.length; i++){
        // createElement(): crea una etiqueta del tipo que es pasado por parametro
        let tr = document.createElement("tr")
        let th = document.createElement("th")
        th.scope = "row" // scope: especifica que esa etiqueta es la cabecera, en este caso de la fila
        th.innerHTML = i + 1
        tr.appendChild(th) //appendChild(): agrega un nuevo hijo a la etiqueta especificada

        let td = document.createElement("td")
        td.innerHTML = respuesta[i].nombre
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerHTML = respuesta[i].descripcion
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerHTML = respuesta[i].numero
        tr.appendChild(td)

        cuerpo.appendChild(tr);
    }    
}

async function eliminar() {
    let nombre = document.getElementById("nombre-eliminar").value

    let peticion = await fetch("http://localhost:3000/eliminarContacto/" + nombre, {
        method: "delete"
    })
    let respuesta = await peticion.json()
    alert(respuesta.mensaje)

    document.getElementById("nombre-eliminar").value = ""
}

async function editar() {
    let nombre = document.getElementById("nombre-editar").value
    let numero = document.getElementById("numero-editar").value

    let peticion = await fetch("http://localhost:3000/actualizarContacto/" + nombre, {
        method: "put",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({
            numero: numero
        })
    })
    let respuesta = await peticion.json()
    alert(respuesta.mensaje)

    document.getElementById("nombre-editar").value = ""
    document.getElementById("numero-editar").value = ""
}