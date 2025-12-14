import { agregarAlCarrito } from "./funcionesCarrito.js";
import { mostrarMensaje } from "./ui.js";

const createCarteraCardElement = (cartera) => {
    const prod = cartera;
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    const imgEl = document.createElement('img');
    imgEl.src = cartera.imagen;
    imgEl.alt = cartera.nombre;
    cardEl.appendChild(imgEl);
    const h3El = document.createElement('h3');
    h3El.textContent = cartera.nombre;
    cardEl.appendChild(h3El);
    const descripcionEl = document.createElement('p');
    descripcionEl.textContent = cartera.descripcion;
    cardEl.appendChild(descripcionEl);
    const precioEl = document.createElement('h5');
    precioEl.textContent = `$ ${cartera.precio}`;
    cardEl.appendChild(precioEl);
    const agregarBtn = document.createElement('button');
    agregarBtn.className = 'btn';
    agregarBtn.textContent = 'Agregar al carrito';
    agregarBtn.addEventListener('click', () => {
        agregarAlCarrito(prod);
    });
    cardEl.appendChild(agregarBtn);
    return cardEl;
}; 

document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.getElementById('productos-container');
    productosContainer.innerHTML = "";

    fetch('../data/carteras.json')
        .then(res => {
            if(!res.ok) {
                throw new Error(`Error HTTP status: ${res.status}`);
            }

            return res.json();
        })
        .then( data => {
            if(data.carteras.length) {
                // tenemos carteras, podemos escribirlas en el DOM
                data.carteras.map(cartera => {
                    const carteraCardElement = createCarteraCardElement(cartera);
                    productosContainer.appendChild(carteraCardElement);
                });
            }
        })
        .catch(err => console.error(err));
});