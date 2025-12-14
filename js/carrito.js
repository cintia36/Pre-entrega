import { obtenerCarrito, guardarCarrito, vaciarCarrito } from './storage.js';
import { actualizarContador, mostrarMensaje, preguntar } from './ui.js';
import { eliminarProducto, agregarAlCarrito } from './funcionesCarrito.js'


/**
 * <div class="card">
        <div class="producto-order">
            <img src="/img/productos/CarteraMarron.png" alt="Cartera Urban" class="orden-image">
            <div class="proucto-order-cantidad">                
                <h3>Cartera Urban</h3>
                <h5>Precio: $ 23456, cantidad pedida: <span>3</span></h5>
                <h4>TOTAL: $ 7.035<</h4>
            </div>
            <div class="acciones-producto-carrito">
                <button type="button" class="producto-accion"> - </button>
                <button type="button" class="producto-accion">Eliminar del carrito</button>
                <button type="button" class="producto-accion">+</button> 
            </div>
        </div>
    </div>
    */
const createCarteraCardElement = (cartera, cantidad) => {    
    const prod = cartera;

    // proucto-order-cantidad
    const productoOrderCantidadEl = document.createElement('div');

    const nombreProductoEl = document.createElement('h3');
    nombreProductoEl.textContent = cartera.nombre;
    productoOrderCantidadEl.appendChild(nombreProductoEl);

    const cantidadEl = document.createElement('span');
    cantidadEl.innerText = cantidad;
    cantidadEl.id = `cantidad-${cartera.id}`;
    const precioCantidadEl = document.createElement('h5');
    precioCantidadEl.innerHTML = `Precio: $ ${cartera.precio}, cantidad pedida ${cantidadEl.getHTML()}`;
    productoOrderCantidadEl.appendChild(precioCantidadEl);

    const precioTotalEl = document.createElement('h4');
    precioTotalEl.innerText = `TOTAL: $ ${cantidad * cartera.precio}`;
    productoOrderCantidadEl.appendChild(precioTotalEl);

    // acciones-producto-carrito
    const accionesProductoCarritoEl = document.createElement('div');
    accionesProductoCarritoEl.className = 'acciones-producto-carrito';
    const quitarUnoEl = document.createElement('button');
    quitarUnoEl.className = 'producto-accion';
    quitarUnoEl.textContent = ' - ';
    quitarUnoEl.addEventListener('click', () => {
        const carritoActual = obtenerCarrito();
        const indexPrimero = carritoActual.findIndex(producto => producto.id == prod.id);
        carritoActual.splice(indexPrimero, 1);
        guardarCarrito(carritoActual);
        dibujarCarritoCompras();
    });
    accionesProductoCarritoEl.appendChild(quitarUnoEl);

    const eliminarProductoEl = document.createElement('button');
    eliminarProductoEl.className = 'producto-accion eliminar desktop';
    eliminarProductoEl.textContent = 'Eliminar del carrito';
    eliminarProductoEl.addEventListener('click', () => {
        eliminarProducto(prod.id);
        dibujarCarritoCompras();
    });
    accionesProductoCarritoEl.appendChild(eliminarProductoEl);

    const eliminarProductoMobileEl = document.createElement('button');
    eliminarProductoMobileEl.className = 'producto-accion eliminar mobile';
    eliminarProductoMobileEl.textContent = ' X ';
    eliminarProductoMobileEl.alt = 'Eliminar producto del carrito';
    eliminarProductoMobileEl.addEventListener('click', () => {
        eliminarProducto(prod.id);
        dibujarCarritoCompras();
    });
    accionesProductoCarritoEl.appendChild(eliminarProductoMobileEl);
    
    const agregarUnoEl = document.createElement('button');
    agregarUnoEl.className = 'producto-accion';
    agregarUnoEl.textContent = ' + ';
    agregarUnoEl.addEventListener('click', () => {
        const carritoActual = obtenerCarrito();
        const producto = carritoActual.find(producto => producto.id == prod.id);
        agregarAlCarrito(producto, true);
        dibujarCarritoCompras();
    });
    accionesProductoCarritoEl.appendChild(agregarUnoEl);

    // armar card
    const productoOrderEl = document.createElement('div');
    productoOrderEl.className = 'producto-order';

    const imgEl = document.createElement('img');
    imgEl.src = cartera.imagen;
    imgEl.className = 'orden-image'
    imgEl.alt = cartera.nombre;
    productoOrderEl.appendChild(imgEl);

    productoOrderEl.appendChild(imgEl);
    productoOrderEl.appendChild(productoOrderCantidadEl);
    productoOrderEl.appendChild(accionesProductoCarritoEl);

    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.appendChild(productoOrderEl);

    return cardEl;
};

const dibujarCarritoCompras = () => {
    const carritoContainer = document.getElementById('productos-container');
    carritoContainer.innerHTML = "";

    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    if(carrito.length > 0) {
        const carritoOrdenado = carrito.sort((a, b) => a.id - b.id);
        let productoActual = carritoOrdenado[0].id;
        let cantidadActual = 0;
        let vuelta = 0;
        let total = 0;

        do {
            if(vuelta == carritoOrdenado.length || productoActual !== carritoOrdenado[vuelta].id) {
                // imprimo cuando cambia de producto o termina el array
                const productoElement = createCarteraCardElement(carritoOrdenado[vuelta-1], cantidadActual);
                carritoContainer.appendChild(productoElement);
                total += carritoOrdenado[vuelta-1].precio * cantidadActual;

                productoActual = carritoOrdenado[vuelta]?.id || '';
                cantidadActual = 0;
            }

            cantidadActual++;
            vuelta++;
        } while(vuelta <= carritoOrdenado.length);

        mostrarTotal(total);

    }
};

const mostrarTotal = (total) => {
    const totalCompraEl = document.getElementById('total-compra');
    totalCompraEl.innerText = total || 0;
}

const agregarHandlerBotonesCompra = () => {
    const vaciarEl = document.getElementById('vaciar-carrito');
    // vaciarEl.removeEventListener('click'); 
    vaciarEl.addEventListener('click', () => {
        vaciarCarrito();
        mostrarMensaje('Se han eliminado todos los productos');
        dibujarCarritoCompras();
        mostrarTotal(0);
    });
    
    const pagarEl = document.getElementById('pagar-compra');
    // pagarEl.removeEventListener('click'); 
    pagarEl.addEventListener('click', () => {
        const totalEl = document.getElementById('total-compra');
        const pregunta = `Estas por pagar $${totalEl.innerText}. Confirmas la compra?`;
        preguntar(
            pregunta, 
            () => { // si avanza con el pago
                // ... logica para pagar
                mostrarMensaje(`Has pagado $${totalEl.innerText}, muchas gracias por su compra`);
                vaciarCarrito();
                dibujarCarritoCompras();
                mostrarTotal(0);
            },
            () => {} // no hago nada, puede decidir finalizar la compra luego
        )
    });
}

document.addEventListener("DOMContentLoaded", () => {
    dibujarCarritoCompras();
    agregarHandlerBotonesCompra();
});