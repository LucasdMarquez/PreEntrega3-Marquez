
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let total = parseFloat(localStorage.getItem('total')) || 0;

function agregarProducto(nombre, precio) {
    const productoExistente = carrito.find(producto => producto.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad++;
        productoExistente.precio += precio;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    total += precio;
    mostrarCarrito();
    guardarCarrito();
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
        listaProductos += `
            <div class="producto">
                Nombre: ${producto.nombre}, Precio: ${producto.precio}, 
                Cantidad: 
                <button onclick="cambiarCantidad('${producto.nombre}', -1)">-</button>
                <span class="contador">${producto.cantidad}</span>
                <button onclick="cambiarCantidad('${producto.nombre}', 1)">+</button>
            </div>
        `;
    });
    listaProductos += `Total de la compra: ${calcularTotal()}`;
    carritoDiv.innerHTML = listaProductos;
}


function cambiarCantidad(nombre, cambio) {
    const producto = carrito.find(producto => producto.nombre === nombre);
    if (producto) {
        producto.cantidad += cambio;
        producto.precio += cambio * (producto.precio / producto.cantidad);
        if (producto.cantidad <= 0) {
            carrito = carrito.filter(p => p.nombre !== nombre);
        } else {
            total += cambio * (producto.precio / producto.cantidad);
        }
        mostrarCarrito();
        guardarCarrito();
    }
}


function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total);
}


function cargarCarrito() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    const totalGuardado = parseFloat(localStorage.getItem('total'));
    if (carritoGuardado && !isNaN(totalGuardado)) {
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
