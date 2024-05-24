// Variables para almacenar información del carrito
let carrito = []; // Array para los productos en el carrito
let total = 0; // Variable para el total de la compra
// Agregar un producto al carrito
function agregarProducto(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    
}

// Calcular el total del carrito
function calcularTotal() {
    return total;
}
const producto1 = { nombre: 'Camiseta', precio: 20 };
const producto2 = { nombre: 'Zapatillas', precio: 50 };
// Filtrar productos por precio
function filtrarPorPrecio(maxPrecio) {
    return carrito.filter(producto => producto.precio <= maxPrecio);
}

// Buscar un producto por nombre
function buscarProducto(nombre) {
    return carrito.find(producto => producto.nombre === nombre);
}
while (true) {
    const nombreProducto = prompt('Ingresa el nombre del producto (o escribe "salir" para finalizar):');
    if (nombreProducto.toLowerCase() === 'salir') {
        break;
    }
    const precioProducto = parseFloat(prompt('Ingresa el precio del producto:'));
    agregarProducto(nombreProducto, precioProducto);
}

console.log('Productos en el carrito:', carrito);
console.log('Total de la compra:', calcularTotal());

let listaProductos = 'Productos en el carrito:\n';
for (let producto of carrito) {
    listaProductos += `Nombre: ${producto.nombre}, Precio: ${producto.precio}\n`;
}
listaProductos += `Total de la compra: ${calcularTotal()}`;
alert(listaProductos);