const STORAGE_KEY = 'KEY_DIFICIL';

export const guardarCarrito = (nuevoEstado) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevoEstado));
}

export const obtenerCarrito = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export const vaciarCarrito = () => {
    localStorage.removeItem(STORAGE_KEY);
}