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




// ELEMENTOS PARA FINALIZAR LA COMPRA
const btnComprar = document.querySelector(".btn-comprar");
const btnCerrarCompra = document.getElementById("cerrar-compra");
const finalizarCompra = document.querySelector(".finalizar-compra");

// Abrir finalizar compra al hacer clic en "COMPRAR"
btnComprar.addEventListener("click", () => {
    carrito.classList.remove("activo");
    finalizarCompra.classList.add("activo");
});

// Cerrar finalizar compra al hacer clic en "X"
btnCerrarCompra.addEventListener("click", () => {
    finalizarCompra.classList.remove("activo");
});



// ----------------- INICIAR DOCUMENTO -----------------
if (document.readyState == "cargando") {
    document.addEventListener('DOMContentLoaded', iniciar);
} else {
    iniciar();
}


document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
});

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



const container = document.getElementById('productosContainer');
async function cargarProductos() {
    try {
        const response = await fetch('./data/productos.json');
        const productos = await response.json();

        productos.forEach(producto => {
            const card = document.createElement('div');
            card.classList.add('card');

            const link = document.createElement('a');
            link.href = 'index.html';

            const imagen = document.createElement('img');
            imagen.src = producto.imagen;
            imagen.alt = producto.nombre;
            imagen.classList.add('img-producto');
            link.appendChild(imagen);

            const nombre = document.createElement('p');
            nombre.classList.add('card-name');
            nombre.textContent = producto.nombre;

            const precio = document.createElement('span');
            precio.classList.add('precio');
            precio.textContent = producto.precio;

            const buttonAgregar = document.createElement('img');
            buttonAgregar.src = 'https://img.icons8.com/material-outlined/40/null/add-shopping-cart.png';
            buttonAgregar.classList.add('buttonAgregar');

            card.appendChild(link);
            card.appendChild(nombre);
            card.appendChild(precio);
            card.appendChild(buttonAgregar);

            container.appendChild(card);
        });

        addEventos();

    } catch (error) {
        Toastify({
            text: "Error al cargar los productos: " + error.message,
            duration: 3000,
            position: "bottom",
        }).showToast();
    }
}



// ----------------- FUNCIONES DE EVENTOS -----------------
function addEventos() {

    // BUSCAR PRODUCTOS
    let searchBox = document.querySelectorAll(".searchBox");
    searchBox.forEach(buscar => {
        buscar.addEventListener("input", handle_BuscarProductos);
    })

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

    // BOTON DE COMPRA
    let boton_comprar = document.querySelector(".btn-comprar");
    boton_comprar.addEventListener("click", handle_botonComprar);

    // CARRITO VACIO
    let btnVaciar = document.querySelectorAll('.btn-vaciar');
    btnVaciar.forEach(btnVaciar => {
        btnVaciar.addEventListener("click", handle_vaciarCarrito);
    })
}


//----------------- HANDLE DE LAS FUNCIONES DE EVENTOS -----------------

// BUSCAR PRODUCTOS EN EL HTML

function handle_BuscarProductos() {
    const buscar = this.value.toUpperCase();

    const productos = document.querySelectorAll(".card");

    productos.forEach((producto) => {
        const nombreProducto = producto.querySelector(".card-name").innerHTML.toUpperCase();

        producto.style.display = nombreProducto.includes(buscar) ? "grid" : "none";
    });
};


//AGREGANDO PROODUCTOS
function handle_agregarProductos() {

    let producto = this.parentElement;
    let { innerHTML: nombre } = producto.querySelector(".card-name");
    let { innerHTML: precio } = producto.querySelector(".precio");
    let { src: img } = producto.querySelector(".img-producto");


    let newAgregandoProductos = {
        nombre,
        precio,
        img,
    };


    // SI EL PRODUCTO YA EXISTE
    const productoExistente = productosAgregados.find((existeProducto) => existeProducto.nombre === newAgregandoProductos.nombre);

    Toastify({
        text: productoExistente !== undefined ? "Este producto ya se encuentra en tu carrito!" : "Producto agregado!",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: {
            background: `${productoExistente !== undefined ? "linear-gradient(to right, #d20909, #b60f0f)" : "linear-gradient(to right, #25b60f, #027d0d)"}`,
        },
    }).showToast();

    // Si el producto ya existe, no se agrega nuevamente
    if (productoExistente !== undefined) {
        return;
    }

    productosAgregados.push(newAgregandoProductos);


    // AGREGAR PRODUCTOS AL CARRITO
    let cardElement = htmlElementos(nombre, precio, img);
    let newNodo = document.createElement("div");
    newNodo.innerHTML = cardElement;
    const contenidoCarrito = carrito.querySelector(".carrito-contenido")
    contenidoCarrito.appendChild(newNodo);
    actualizar();

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

// VACIAR CARRITO
function handle_vaciarCarrito() {
    const contenidoCarrito = document.querySelector(".carrito-contenido");
    contenidoCarrito.innerHTML = "";
    productosAgregados = [];
    actualizar();

    sessionStorage.setItem("Carrito", JSON.stringify(productosAgregados));

}

// BOTON DE COMPRA
function handle_botonComprar() {
    if (productosAgregados.length <= 0) {
        Toastify({
            text: "Tu carrito está vacio. Por favor, selecciona un producto para finalizar tu compra.",
            duration: 3000,
            gravity: 'top',
            position: 'center',
            style: {
                background: "linear-gradient(to right, #d20909, #b60f0f)",
            }
        }).showToast();
        return;
    }
    actualizar();
}

// CANTIDAD DE LOS PRODUCTOS
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


//MENSAJE FINALIZADA LA COMPRA
const btnPagar = document.getElementById('btnPagar');

btnPagar.addEventListener('click', function () {
    const nombreCompleto = document.getElementById('nombreCompleto').value;
    const email = document.getElementById('email').value;
    const numeroTarjeta = document.getElementById('numero_tarjeta').value;
    const provincia = document.getElementById('provincia').value;
    const ciudad = document.getElementById('ciudad').value;
    const direccion = document.getElementById('direccion').value;


    actualizarTotal();

    // SIMULACION DE PROCESAMIENTO DE PAGO CON SETTIMEOUT
    Swal.fire({
        title: 'Procesando pago...',
        html: 'Procesando tu pago, por favor espera...',
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
            setTimeout(() => {
                const totalCompra = document.getElementById('total-compra').innerHTML;
                const mensaje = `
                    ¡Gracias ${nombreCompleto} por elegirnos!
                    <br>
                    ¡El pago fue realizado con éxito!
                    <br><br>
                    Te hemos enviado tu factura de compra y el código de seguimiento a tu correo: ${email}
                    <br><br>
                    Tu compra llegará en 7 dias hábiles a tu domicilio: ${direccion}, ${ciudad}, ${provincia}.
                    <br><br>
                    Pagaste ${totalCompra}.
                    <br>
                    Tarjeta: **** - **** - **** - ${numeroTarjeta.slice(-4)}.
                    `;
                Swal.update({
                    title: '¡Pago exitoso!',
                    html: mensaje,
                    icon: 'success',
                    showConfirmButton: true,
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                    didClose: () => {
                        sessionStorage.clear();
                        location.reload();
                    }
                });
                Swal.hideLoading();
            }, 2000);
        }
    });
});


//----------------- ACTUALIZACION DE LAS FUNCIONES -----------------
// TOTAL DE LA COMPRA


function actualizarTotal() {
    let carritoProductos = document.querySelectorAll('.productos');
    const totalCarrito = carrito.querySelector('.total-precio');
    const totalCompra = document.getElementById('total-compra');

    let total = 0;
    carritoProductos.forEach(productos => {
        let precioElement = productos.querySelector('.carrito-precio-producto');
        let precio = parseFloat(precioElement.innerHTML.replace("$", ""));
        let cantidad = productos.querySelector(".carrito-cantidad").value;
        total += precio * cantidad;
    });

    total = Math.round(total * 100) / 100;
    totalCarrito.innerHTML = "$" + total;

    const cuotasSelect = document.getElementById('cuotas');
    const cuotasSeleccionadas = parseInt(cuotasSelect.value);
    const totalEnCuotas = calcularTotalEnCuotas(total, cuotasSeleccionadas);

    const totalCompleto = totalEnCuotas * cuotasSeleccionadas;
    totalCompra.innerHTML = "Total: $" + totalCompleto.toFixed(2) + " / Cuotas: $" + totalEnCuotas.toFixed(2);

}

function calcularTotalEnCuotas(total, cuotas) {
    const intereses = {
        3: 1.05,
        6: 1.5,
        12: 2.2
    };
    let totalEnCuotas = total;

    if (cuotas === 3 || cuotas === 6 || cuotas === 12) {
        const factorInteres = intereses[cuotas];
        totalEnCuotas = (total * factorInteres) / cuotas;
    }

    return Math.round(totalEnCuotas * 100) / 100;


}

const cuotasSelect = document.getElementById('cuotas');
cuotasSelect.addEventListener('change', actualizarTotal);



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