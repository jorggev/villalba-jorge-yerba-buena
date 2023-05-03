// ABRIR - CERRAR CARITTO
const carritoBtn = document.getElementById("carrito-btn");
const cerrarCarritoBtn = document.getElementById("cerrar-carrito-btn");
const carrito = document.querySelector(".carrito");

carritoBtn.addEventListener("click", () => {
    carrito.classList.toggle("activo");
});

cerrarCarritoBtn.addEventListener("click", () => {
    carrito.classList.remove("activo");
});

// ----------------- INICIAR DOCUMENTO -----------------
if (document.readyState == "cargando") {
    document.addEventListener('DOMContentLoaded', iniciar);
} else {
    iniciar();
}


let productosAgregados = []
// ----------------- FUNCIONES DE INICIO -----------------
function iniciar() {
    addEventos();
}



// ----------------- FUNCIONES DE PARA ACTUALIZAR EL CARRITO -----------------
function actualizar() {
    addEventos();
    actualizarTotal();
    actualizarContador();

}

// ----------------- FUNCIONES DE EVENTOS -----------------
function addEventos() {

    // QUITAR ELEMENTOS DEL CARRITO
    let quitarCarrito_botones = document.querySelectorAll(".carrito-btn-eliminar");

    quitarCarrito_botones.forEach(btnQuitar => {
        btnQuitar.addEventListener("click", handle_quitarCarritoItem);
    });

    // CAMBIAR LA CANTIDAD DE PRODUCTOS SELECCIONADOS
    let carritoCantidad_inputs = document.querySelectorAll('.carrito-cantidad');
    carritoCantidad_inputs.forEach(input => {
        input.addEventListener("change", handle_cambiarCantidad)
    })

    // AGREGANDO MAS PRODUCTOS AL CARRITO
    let btnsAgregar_carrito = document.querySelectorAll('.buttonAgregar');
    btnsAgregar_carrito.forEach(btn => {
        btn.addEventListener("click", handle_agregarProductos);
    })

    // CARRITO VACIO
    let btnVaciar = document.querySelectorAll('.btn-vaciar');
    btnVaciar.forEach(btnVaciar => {
        btnVaciar.addEventListener("click", handle_vaciarCarrito);
    })
}


//----------------- HANDLE DE LAS FUNCIONES DE EVENTOS -----------------

function handle_agregarProductos() {


    let producto = this.parentElement;
    let nombre = producto.querySelector(".card-name").innerHTML;
    let precio = producto.querySelector(".precio").innerHTML;
    let img = producto.querySelector(".img-producto").src;

    let newAgregandoProductos = {
        nombre,
        precio,
        img,
    };


    // SI EL PRODUCTO YA EXISTE
    if (productosAgregados.find((tit) => tit.nombre == newAgregandoProductos.nombre)) {
        return;
    }
    else {
        productosAgregados.push(newAgregandoProductos);
    }

    // AGREGAR PRODUCTO AL CARRITO
    let cardElement = htmlElementos(nombre, precio, img);
    let newNodo = document.createElement("div");
    newNodo.innerHTML = cardElement;
    const contenidoCarrito = carrito.querySelector(".carrito-contenido")
    contenidoCarrito.appendChild(newNodo);
    actualizar();

    localStorage.setItem("Carrito", JSON.stringify(productosAgregados));
    sessionStorage.setItem("Carrito", JSON.stringify(productosAgregados));

}


function handle_quitarCarritoItem() {
    this.parentElement.remove();
    productosAgregados = productosAgregados.filter(
        (tit) =>
            tit.nombre !=
            this.parentElement.querySelector('.carrito-nombre-producto').innerHTML
    );
    actualizar();

}

function handle_vaciarCarrito() {
    const contenidoCarrito = document.querySelector(".carrito-contenido");
    contenidoCarrito.innerHTML = "";
    productosAgregados = [];
    actualizar();

}


function handle_cambiarCantidad() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value);

    actualizar();
}


function actualizarContador() {
    const contador = document.querySelector('.contador');
    const carritoContenido = document.querySelector('.carrito-contenido');
    const cantidad = carritoContenido.childElementCount;
    contador.textContent = cantidad.toString();
}


//----------------- ACTUALIZACION DE LAS FUNCIONES -----------------
function actualizarTotal() {
    let carritoProductos = document.querySelectorAll('.productos');
    const totalCarrito = carrito.querySelector('.total-precio');
    let total = 0;
    carritoProductos.forEach(productos => {
        let precioELement = productos.querySelector('.carrito-precio-producto');
        let precio = parseFloat(precioELement.innerHTML.replace("$", ""));
        let cantidad = productos.querySelector(".carrito-cantidad").value;
        total += precio * cantidad;
    })

    total = Math.round(total * 100) / 100;


    totalCarrito.innerHTML = "$" + total;
}



//----------------- ELEMENTOS PARA EL HTML -----------------

function htmlElementos(nombre, precio, img) {
    return `
    <div class="productos">
    <img src=${img} alt="" class="img-producto-carrito">
    <div class="detalles-producto">
        <div class="carrito-nombre-producto">${nombre}</div>
        <div class="carrito-precio-producto">${precio}</div>
        <input type="number" value="1" class="carrito-cantidad">
    </div>
    <!-- BOTON PARA ELIMINAR PRODUCTOS DEL CARRITO -->
    <img src="https://img.icons8.com/ios/50/null/delete--v1.png" class="carrito-btn-eliminar" />
    </div>`;
}

//----------------- FUNCION PARA RECUPERAR PRODUCTOS DEL CARRITO -----------------

window.onload = function () {

    // Verificar si hay productos en el carrito almacenados en sessionStorage
    if (sessionStorage.getItem("Carrito")) {
        productosAgregados = JSON.parse(sessionStorage.getItem("Carrito"));
        // Recuperar los productos del carrito en la página
        productosAgregados.forEach(function (producto) {
            let cardElement = htmlElementos(producto.nombre, producto.precio, producto.img);
            let newNodo = document.createElement("div");
            newNodo.innerHTML = cardElement;
            const contenidoCarrito = carrito.querySelector(".carrito-contenido");
            contenidoCarrito.appendChild(newNodo);
        });
        actualizar();
    }
}