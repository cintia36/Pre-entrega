import { guardarCarrito, obtenerCarrito, vaciarCarrito } from '../js/storage.js';
import { actualizarContador, mostrarMensaje } from '../js/ui.js'

export const agregarAlCarrito = (producto, omitirMensaje) => {
    const carrito = obtenerCarrito();
    carrito.push(producto);
    guardarCarrito(carrito);
    actualizarContador(carrito);
    if(!omitirMensaje)
        mostrarMensaje(`Agregaste al producto: ${producto.nombre}`);
};

export const eliminarProducto = (id) => {
    const carrito = obtenerCarrito();
    const nuevoEstado = carrito.filter(producto => producto.id !== id);
    guardarCarrito(nuevoEstado);
    actualizarContador(nuevoEstado);
    mostrarMensaje("Producto eliminado");
};

export const vaciarElCarrito = () => {
    vaciarCarrito();
    actualizarContador([]);
    mostrarMensaje('vaciaste tu carrito');
}

document.addEventListener("DOMContentLoaded", () => {
    // mantener actualizado el numero de productos donde sea que se cargue este js
    const carrito = obtenerCarrito();
    actualizarContador(carrito);
});