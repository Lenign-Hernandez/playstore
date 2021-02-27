//El siguiente código es el encargado de generar la informaación de prueba. Se recomienda no modificarlo.

var categorias = [];
(() => {
    //Este arreglo es para generar textos de prueba
    let textosDePrueba = [
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
        "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
        "Quaerat quod qui molestiae sequi, sint aliquam omnis quos voluptas?",
        "Non impedit illum eligendi voluptas. Delectus nisi neque aspernatur asperiores.",
        "Ducimus, repellendus voluptate quo veritatis tempora recusandae dolorem optio illum."
    ]

    //Genera dinamicamente los JSON de prueba para esta evaluacion,
    //Primer ciclo para las categorias y segundo ciclo para las apps de cada categoria


    let contador = 1;
    for (let i = 0; i < 5; i++) { //Generar 5 categorias
        let categoria = {
            nombreCategoria: "Categoria " + i,
            descripcion: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
            aplicaciones: []
        };
        for (let j = 0; j < 10; j++) { //Generar 10 apps por categoria
            let aplicacion = {
                codigo: contador,
                nombre: "App " + contador,
                descripcion: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
                icono: `img/app-icons/${contador}.webp`,
                instalada: contador % 3 == 0 ? true : false,
                app: "app/demo.apk",
                calificacion: Math.floor(Math.random() * (5 - 1)) + 1,
                descargas: 1000,
                desarrollador: `Desarrollador ${(i+1)*(j+1)}`,
                imagenes: ["img/app-screenshots/1.webp", "img/app-screenshots/2.webp", "img/app-screenshots/3.webp"],
                comentarios: [{
                        comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
                        calificacion: Math.floor(Math.random() * (5 - 1)) + 1,
                        fecha: "12/12/2012",
                        usuario: "Juan"
                    },
                    {
                        comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
                        calificacion: Math.floor(Math.random() * (5 - 1)) + 1,
                        fecha: "12/12/2012",
                        usuario: "Pedro"
                    },
                    {
                        comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
                        calificacion: Math.floor(Math.random() * (5 - 1)) + 1,
                        fecha: "12/12/2012",
                        usuario: "Maria"
                    },
                ]
            };
            contador++;
            categoria.aplicaciones.push(aplicacion);
        }
        categorias.push(categoria);
    }

    console.log(categorias);
})();

var localStorage = window.localStorage;
var aplicaciones = [];

function guardarLocalStorage() {

    if (localStorage.getItem('Categoria 0') !== null) {
        for (let i = 0; i < 5; i++) {
            aplicaciones.push(JSON.parse(localStorage.getItem(`Categoria ${i}`)));

            document.getElementById('selectCategoria').innerHTML += `
            <option value=${i}>${aplicaciones[i].nombreCategoria}</option>`
        }
    } else {
        categorias.forEach(function(apps, indice) {
            localStorage.setItem(`Categoria ${indice}`, JSON.stringify(categorias[`${indice}`]));
            aplicaciones.push(JSON.parse(localStorage.getItem(`Categoria ${indice}`)));

            document.getElementById('selectCategoria').innerHTML += `
            <option value=${indice}>${categorias[indice].nombreCategoria}</option>`
        });
    }
    console.log(aplicaciones);


}

guardarLocalStorage();

var categoriaActual = ''

function cambioCategoria(categoria) {

    document.getElementById('fila').innerHTML = '';
    categoriaActual = aplicaciones[categoria];
    categoriaActual.aplicaciones.forEach(function(aplicacion, indice) {
        let star = '';
        for (let i = 0; i < aplicacion.calificacion; i++) {
            star += '<i class="fas fa-star"></i>';
        }
        for (let i = 0; i < 5 - aplicacion.calificacion; i++) {
            star += '<i class="far fa-star"></i>';
        }
        if (aplicacion.precio < 0.5) {
            var precio = 'FREE'
        } else {
            var precio = aplicacion.precio
        }

        document.getElementById('fila').innerHTML +=
            `<div class="col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2">
            <div class="card mt-3" onclick="detalleApp(${indice})">
                <img class="card-img-top" src="${aplicacion.icono}" alt="Card image cap">
                <div id="bodyCard" class="card-body">
                    <h5 class="card-title">${aplicacion.nombre}</h5>
                    <p id="desarrollador" class="card-text"> ${aplicacion.desarrollador}</p>
                    ${star}
                    <p  class="card-text mt-1 font-weight-bold precio">$${precio}</p>
                </div>
            </div>
        </div>`
    });

}

cambioCategoria(0);

function detalleApp(indice) {
    $('#detalleModal').modal('show');

    if (categoriaActual.aplicaciones[indice].precio < 0.5) {
        var precio = 'FREE';
    } else {
        var precio = categoriaActual.aplicaciones[indice].precio;
    }

    let contador = 0;
    categoriaActual.aplicaciones[indice].imagenes.forEach(function(imagen) {
        if (contador == 0) {
            var estaActivo = 'active';
        } else {
            var estaActivo = '';
        }
        document.getElementById('carrusel-img').innerHTML +=
            `
        <div class="carousel-item ${estaActivo}">
       
        <img class="img-fluid" src="${imagen}" alt="">
        </div>
        `
        contador += 1;
    });

    document.getElementById('bodyModal').innerHTML =
        `   <div class="row">
            <div class="col-4">
                <img class="img-fluid" src="${categoriaActual.aplicaciones[indice].icono}" alt="">
            </div>
            <div class="col-8">
                <h5>${categoriaActual.aplicaciones[indice].nombre}</h5>
                <p id="desarrolladorModal"> ${categoriaActual.aplicaciones[indice].desarrollador} </p>
                <p> ${categoriaActual.aplicaciones[indice].descripcion} </p>
                <p class="font-weight-bold precio">$${precio}</p>
            </div>
        </div>
        `

    let star = '';
    let calificacion = categoriaActual.aplicaciones[indice].calificacion;
    for (let i = 0; i < calificacion; i++) {
        star += '<i class="fas fa-star"></i>';
    }
    for (let i = 0; i < 5 - calificacion; i++) {
        star += '<i class="far fa-star"></i>';
    }
    document.getElementById('bodyModal').innerHTML +=
        `   <div class="d-flex justify-content-center text-success border-top" >
           
            <span class="ml-2 my-3" > ${star}  ${calificacion}.0</span>  
        </div>  `

    categoriaActual.aplicaciones[indice].comentarios.forEach(function(comentario) {
        document.getElementById('bodyModal').innerHTML +=
            `   <div class="border-top">
                <div class="row mx-3 my-3">
                    <div class="col-2" >
                        <img src="./img/user.webp" style="border-radius:25px;" alt=""> 
                    </div>
                    <div class="col-10">${comentario.comentario}</div>
                </div>  
            </div>
            `
    });


    if (categoriaActual.aplicaciones[indice].instalada == false) {
        document.getElementById('footerModal').innerHTML = `
        <button type="button" onclick="eliminar(${indice})" class="btn btn-danger">Instalar</button>
        <button type="button" class="btn btn-dark" data-dismiss="modal">Cerrar</button>
        `;
    } else {
        document.getElementById('footerModal').innerHTML = `
        <button type="button" onclick="eliminar(${indice})" class="btn btn-danger">Eliminar</button>
        <button type="button" class="btn btn-dark" data-dismiss="modal">Cerrar</button>
        <button type="button" id="botonInstalar" class="btn btn-success">Instalar</button>`;

    }

}