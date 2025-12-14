
export const actualizarContador = (carrito) => {
    if(carrito) {
        const contador = document.getElementById('contador-carrito');
        contador.textContent = carrito.length;
    }
}

export const mostrarMensaje = (texto) => {
    alert(texto);
}

export const preguntar = (texto, callbackSi, callbackNo) => {
    const esSi = confirm(texto);

    if(esSi) {
        callbackSi();
    } else {
        callbackNo();
    }
}