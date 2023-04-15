function datosDelUsuario() {
    let nombre = prompt("Ingrese su nombre:");
    while (!nombre || !isNaN(nombre)) {
        nombre = prompt("Por favor, ingrese su nombre:");
    }

    let edad = prompt("Ingrese su edad:");
    while (!edad || isNaN(edad) || edad < 18 || edad > 100) {
        edad = prompt("Por favor, ingrese su edad (debe ser mayor o igual a 18 años):");
    }

    let ciudad = prompt("Ingrese su ciudad:");
    while (!ciudad || !isNaN(ciudad)) {
        ciudad = prompt("Por favor, ingrese su ciudad:");
    }

    return {
        nombre: nombre,
        edad: edad,
        ciudad: ciudad
    };
}
const datosUsuario = datosDelUsuario();

class Producto {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
        this.cantidad = cantidad;
    }
}

let productos = [
    new Producto("Mates", 9000, 56),
    new Producto("Termos", 4000, 62),
    new Producto("Bombillas", 2000, 77),
];

// PROCESO DE COMPRA
let carrito = []; // array para almacenar los productos seleccionados

// Bucle que permite al usuario seleccionar múltiples productos en base a la cantidad disponible de los mismos
while (true) {
    let seleccion = prompt("¿Qué producto desea comprar? (Mates: $9000 / Termos: $4000 / Bombillas: $2000) \n\nSi no desea agregar nada más a su carrito escriba continuar a continuación:").toUpperCase();

    if (seleccion === "CONTINUAR") {
        break;
    }

    // Buscar el producto seleccionado en el array
    let productoSeleccionado = productos.find(producto => producto.nombre.toUpperCase() === seleccion.toUpperCase());

    if (productoSeleccionado) {
        let unidades;

        // Pedir al usuario la cantidad de unidades que desea comprar
        do {
            unidades = parseInt(prompt(`¿Cuántas unidades de ${seleccion} desea comprar?`));
        } while (isNaN(unidades) || unidades < 0);

        // Verificar si hay suficiente stock disponible
        if (unidades > productoSeleccionado.cantidad) {
            alert(`Lo siento, solo hay ${productoSeleccionado.cantidad} unidades disponibles de ${seleccion}.`);
        } else {
            // Actualizar la cantidad en el objeto Producto
            productoSeleccionado.cantidad -= unidades;
            // Agregar el producto seleccionado y su cantidad al carrito
            carrito.push({ producto: productoSeleccionado, unidades: unidades });
        }
    } else {
        alert("El producto seleccionado no existe en la lista.");
    }
}

// Calcular el total de la compra
function calcularTotal(carrito) {
    let total = 0;
    for (let item of carrito) {
        total += item.producto.precio * item.unidades;
    }
    return total;
}


// Resumen de la compra
let totalCompra = calcularTotal(carrito);

let resumen = `Resumen de su compra: `;
for (let item of carrito) {
    resumen += ` \n${item.unidades}  ${item.producto.nombre}: $${item.producto.precio * item.unidades} `;
}
resumen += ` \n\nTotal: $${totalCompra}`;
alert(resumen);

let formaDePago;
while (true) {
    formaDePago = prompt("¿Cómo desea abonar? (1: Efectivo / 2: Transferencia bancaria / 3: Tarjeta de crédito) Coloque solo el número de la opción deseada.");
    if (formaDePago === "1") {
        break;
    } else if (formaDePago === "2") {
        break;
    } else if (formaDePago === "3") {
        break;
    } else {
        alert("Opción inválida. Por favor, ingrese el número de la opción deseada.");
    }
}


if (formaDePago === "1") {
    alert("El costo total de su compra es de $" + totalCompra.toFixed(2) + ". El producto llegará en 7 días hábiles a su domicilio en " + datosUsuario.ciudad + ". El pago se realizará al momento de la entrega.");

} else if (formaDePago === "2") {
    alert("El CBU para realizar la transferencia es 2168316802728989460714 (Alias: yerba.buena.hsbc) por un total de $" + totalCompra.toFixed(2) + ". Por favor, realice la transferencia y confirme a continuación que ha realizado el pago.");

    let pagoConfirmado = confirm("¿Ha realizado la transferencia?");

    if (pagoConfirmado) {
        alert("Gracias por realizar la transferencia " + datosUsuario.nombre + ". Una vez que se haya acreditado el pago, su producto será despachado. Esto puede tardar hasta 72hs hábiles.");

    } else {
        alert("Por favor, realice la transferencia y confirme que ha realizado el pago para que podamos procesar su pedido.");
    }

} else if (formaDePago === "3") {
    let opcionCuotas = prompt("¿En cuántas cuotas desea abonar? 1) Un pago. 2) 3 cuotas. 3) 6 cuotas. 4) 12 cuotas. Coloque solo el número de la opción deseada.");
    let costoCuota;
    let totalConInteres;
    let cantidadCuotas;

    // USO DE SWITCH CON EL FIN DE QUE EL USUARIO PUEDA ELEGIR LA CANTIDAD DE CUOTAS/MONTO FINAL MAS ACCESIBLE.
    switch (opcionCuotas) {
        case "1":
            alert("El costo total de su compra será de $" + totalCompra.toFixed(2) + ".");
            break;
        case "2":
            cantidadCuotas = 3;
            costoCuota = totalCompra / cantidadCuotas;
            totalConInteres = totalCompra * 1.2;
            alert("El costo total de su compra en 3 cuotas será de $" + totalConInteres.toFixed(2) + " con un costo por cuota de $" + costoCuota.toFixed(2));
            break;
        case "3":
            cantidadCuotas = 6;
            costoCuota = totalCompra / cantidadCuotas;
            totalConInteres = totalCompra * 1.5;
            alert("El costo total de su compra en 6 cuotas será de $" + totalConInteres.toFixed(2) + " con un costo por cuota de $" + costoCuota.toFixed(2));
            break;
        case "4":
            cantidadCuotas = 12;
            costoCuota = totalCompra / cantidadCuotas;
            totalConInteres = totalCompra * 2;
            alert("El costo total de su compra en 12 cuotas será de $" + totalConInteres.toFixed(2) + " con un costo por cuota de $" + costoCuota.toFixed(2));
            break;
        default:
            alert("Opción inválida. Por favor, seleccione una opción correcta.");
            break;
    }

    // ULTIMOS PASOS DEL PROCESO DE COMPRA
    let tarjeta = prompt("Por favor, ingrese el número de su tarjeta de crédito.");

    while (tarjeta.length < 12 || isNaN(tarjeta)) {
        tarjeta = prompt("El número de tarjeta ingresado no es válido. Por favor, ingrese un número de tarjeta válido (debe tener entre 12 y 15 números):");
    }

    let nombreTitular = prompt("Ingrese el nombre y apellido del titular de la tarjeta:");
    while (!nombreTitular || !isNaN(nombreTitular)) {
        nombreTitular = prompt("El nombre y apellido ingresado no es válido. Por favor, ingrese un nombre y apellido válido:");
    }

    let fechaVencimiento;

    do {
        fechaVencimiento = prompt("Ingrese la fecha de vencimiento de la tarjeta sin la barra ( / ):");
    } while (!fechaVencimiento || fechaVencimiento.length > 4 || isNaN(fechaVencimiento));


    let codigoSeguridad = prompt("Ingrese el código de seguridad de la tarjeta (debe tener entre 3 y 4 números):");
    while (codigoSeguridad.length < 3 || codigoSeguridad.length > 4 || isNaN(codigoSeguridad)) {
        codigoSeguridad = prompt("El código de seguridad ingresado no es válido. Por favor, ingrese un código de seguridad válido (debe tener entre 3 y 4 números):");
    }

    alert("¡Gracias por su compra " + nombreTitular + "! Su pago de $" + totalCompra + " ha sido aceptado y el producto llegará en 7 días hábiles a su domicilio en " + datosUsuario.ciudad + ".");
}
else {
    alert("Lamentamos que no pueda realizar la compra en este momento. ¡Hasta la próxima, " + datosUsuario.nombre + "!");
}