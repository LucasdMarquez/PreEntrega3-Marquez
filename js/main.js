
let carrito = [];
let total = 0;


function agregarProducto(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    mostrarCarrito();
}

function calcularTotal() {
    return total;
}


function filtrarPorPrecio(maxPrecio) {
    return carrito.filter(producto => producto.precio <= maxPrecio);
}


function buscarProducto(nombre) {
    return carrito.find(producto => producto.nombre === nombre);
}


function mostrarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = '';
    let listaProductos = 'Productos en el carrito:<br>';
    carrito.forEach(producto => {
        listaProductos += `Nombre: ${producto.nombre}, Precio: ${producto.precio}<br>`;
    });
    listaProductos += `Total de la compra: ${calcularTotal()}`;
    carritoDiv.innerHTML = listaProductos;
}


function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total);
    alert('Carrito guardado');
}


function cargarCarrito() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    const totalGuardado = parseFloat(localStorage.getItem('total'));
    if (carritoGuardado && totalGuardado) {
        carrito = carritoGuardado;
        total = totalGuardado;
        mostrarCarrito();
        alert('Carrito cargado');
    } else {
        alert('No hay carrito guardado');
    }
}


document.getElementById('productoForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const nombreProducto = document.getElementById('nombreProducto').value;
    const precioProducto = parseFloat(document.getElementById('precioProducto').value);
    agregarProducto(nombreProducto, precioProducto);
    document.getElementById('productoForm').reset();
});

document.getElementById('guardarCarrito').addEventListener('click', guardarCarrito);
document.getElementById('cargarCarrito').addEventListener('click', cargarCarrito);


document.addEventListener('DOMContentLoaded', mostrarCarrito);
