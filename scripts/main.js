// SOLICITUD DE DATOS BASICOS DEL CLIENTE
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

// PROCESO DE COMPRA
let interesado = confirm("¿Está interesado en comprar mates, termos o bombillas?");

if (interesado) {
    let mates, termos, bombillas;

    do {
        mates = parseInt(prompt("¿Cuántos mates desea comprar? El costo aproximado de cada uno es de $9000"));
    } while (isNaN(mates) || mates < 0);

    do {
        termos = parseInt(prompt("¿Cuántos termos desea comprar? El costo aproximado de cada uno es de $4000"));
    } while (isNaN(termos) || termos < 0);

    do {
        bombillas = parseInt(prompt("¿Cuántas bombillas desea comprar? El costo aproximado de cada una es de $2000"));
    } while (isNaN(bombillas) || bombillas < 0);


    // AQUI SE UTILIZA UNA FUNCION CON PARA CALCULAR EL TOTLA DE LA COMPTRA CONSIDERANDO LOS INTERESES DE LA MISMA 
    function calcularCostoTotal(mates, termos, bombillas) {
        const costoTotal = (mates * 9000 + termos * 4000 + bombillas * 2000) + 1500;
        return costoTotal;
    }

    const costoTotal = calcularCostoTotal(mates, termos, bombillas);

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
        alert("El costo total de su compra es de $" + costoTotal + " ya que el costo de envío es de $1500. El producto llegará en 7 días hábiles a su domicilio en " + ciudad + ". El pago se realizará al momento de la entrega.");

    } else if (formaDePago === "2") {
        alert("El CBU para realizar la transferencia es 12345678901234567890 por un total de $" + costoTotal + ". Por favor, realice la transferencia y confirme a continuación que ha realizado el pago.");

        let pagoConfirmado = confirm("¿Ha realizado la transferencia?");

        if (pagoConfirmado) {
            alert("Gracias por realizar la transferencia " + nombre + ". Una vez que se haya acreditado el pago, su producto será despachado. Esto puede tardar hasta 72hs hábiles.");

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
                alert("El costo total de su compra será de $" + costoTotal + " ya que el costo de envío es de $1500.");
                break;
            case "2":
                cantidadCuotas = 3;
                costoCuota = costoTotal / cantidadCuotas;
                totalConInteres = costoTotal * 1.2;
                alert("El costo total de su compra en 3 cuotas será de $" + totalConInteres + " con un costo por cuota de $" + costoCuota);
                break;
            case "3":
                cantidadCuotas = 6;
                costoCuota = costoTotal / cantidadCuotas;
                totalConInteres = costoTotal * 1.5;
                alert("El costo total de su compra en 6 cuotas será de $" + totalConInteres + " con un costo por cuota de $" + costoCuota);
                break;
            case "4":
                cantidadCuotas = 12;
                costoCuota = costoTotal / cantidadCuotas;
                totalConInteres = costoTotal * 2;
                alert("El costo total de su compra en 12 cuotas será de $" + totalConInteres + " con un costo por cuota de $" + costoCuota);
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

        alert("¡Gracias por su compra " + nombreTitular + "! Su pago de $" + costoTotal + " ha sido aceptado y el producto llegará en 7 días hábiles a su domicilio en " + ciudad + ".");
    }
} else {
    alert("Lamentamos que no pueda realizar la compra en este momento. ¡Hasta la próxima, " + nombre + "!");
}