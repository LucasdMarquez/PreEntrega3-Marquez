document.addEventListener("DOMContentLoaded", function () {
    const cabeza = document.head;
    const cuerpo = document.body;

    // Crear el título
    const titulo = document.createElement('title');
    titulo.innerHTML = 'Carrito de Compras';
    cabeza.appendChild(titulo);

    // Crear la cabecera y la barra de navegación
    const cabecera = document.createElement('header');
    cabecera.className = 'navbar';

    const nav = document.createElement('nav');
    const ul = document.createElement('ul');
    const links = ['Index', 'Products', 'Contact'];

    links.forEach(link => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${link.toLowerCase()}.html">${link}</a>`;
        ul.appendChild(li);
    });

    nav.appendChild(ul);
    cabecera.appendChild(nav);
    cuerpo.appendChild(cabecera);

    // Crear el título principal
    const h1Titulo = document.createElement('h1');
    h1Titulo.classList.add('titulo');
    h1Titulo.innerHTML = 'Carrito de Compras';
    cuerpo.appendChild(h1Titulo);

    // Crear el botón de modo oscuro
    const toggleButton = document.createElement('button');
    toggleButton.id = 'toggle-button';
    toggleButton.textContent = 'Cambiar a modo oscuro';
    cuerpo.appendChild(toggleButton);

    // Crear la sección del carrito
    const carritoTitulo = document.createElement('h2');
    carritoTitulo.textContent = 'Carrito de Compras';
    cuerpo.appendChild(carritoTitulo);

    const carritoDiv = document.createElement('div');
    carritoDiv.id = 'carrito';
    cuerpo.appendChild(carritoDiv);

    // Crear el formulario para agregar productos
    const productoForm = document.createElement('form');
    productoForm.id = 'productoForm';
    productoForm.innerHTML = `
        <input type="text" id="nombreProducto" placeholder="Nombre del producto" required>
        <input type="number" id="precioProducto" placeholder="Precio del producto" required>
        <button type="submit">Agregar Producto</button>
    `;
    cuerpo.appendChild(productoForm);

    // Crear los botones para gestionar el carrito
    const guardarButton = document.createElement('button');
    guardarButton.id = 'guardarCarrito';
    guardarButton.textContent = 'Guardar Carrito';
    cuerpo.appendChild(guardarButton);

    const cargarButton = document.createElement('button');
    cargarButton.id = 'cargarCarrito';
    cargarButton.textContent = 'Cargar Carrito';
    cuerpo.appendChild(cargarButton);

    const vaciarButton = document.createElement('button');
    vaciarButton.id = 'vaciarCarrito';
    vaciarButton.textContent = 'Vaciar Carrito';
    cuerpo.appendChild(vaciarButton);

    // Modo oscuro
    toggleButton.addEventListener('click', function () {
        cuerpo.classList.toggle('dark');
        updateTextButton();
    });

    function updateTextButton() {
        if (cuerpo.classList.contains('dark')) {
            toggleButton.textContent = 'Cambiar a modo claro';
        } else {
            toggleButton.textContent = 'Cambiar a modo oscuro';
        }
    }

    setTimeout(() => {
        cuerpo.classList.remove('dark');
    }, 3000);

    // Código del carrito
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
        Swal.fire({
            icon: 'success',
            title: 'Producto agregado',
            text: `${nombre} ha sido agregado al carrito`,
            timer: 1500
        });
    }

    function calcularTotal() {
        return total;
    }

    function mostrarCarrito() {
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
        listaProductos += `<br>Total de la compra: ${calcularTotal()}`;
        carritoDiv.innerHTML = listaProductos;
    }

    function cambiarCantidad(nombre, cambio) {
        const producto = carrito.find(producto => producto.nombre === nombre);
        if (producto) {
            producto.cantidad += cambio;
            if (producto.cantidad <= 0) {
                carrito = carrito.filter(p => p.nombre !== nombre);
            } else {
                producto.precio = producto.cantidad * (producto.precio / (producto.cantidad - cambio));
            }
            total += cambio * (producto.precio / producto.cantidad);
            mostrarCarrito();
            guardarCarrito();
        }
    }

    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        localStorage.setItem('total', total);
        Swal.fire({
            icon: 'success',
            title: 'Carrito guardado',
            text: 'El carrito ha sido guardado correctamente',
            timer: 1500
        });
    }

    function cargarCarrito() {
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
        const totalGuardado = parseFloat(localStorage.getItem('total'));
        if (carritoGuardado && !isNaN(totalGuardado)) {
            carrito = carritoGuardado;
            total = totalGuardado;
            mostrarCarrito();
            Swal.fire({
                icon: 'success',
                title: 'Carrito cargado',
                text: 'El carrito ha sido cargado correctamente',
                timer: 1500
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No hay carrito guardado',
                timer: 1500
            });
        }
    }

    function vaciarCarrito() {
        carrito = [];
        total = 0;
        mostrarCarrito();
        guardarCarrito();
        Swal.fire({
            icon: 'success',
            title: 'Carrito vaciado',
            text: 'El carrito ha sido vaciado correctamente',
            timer: 1500
        });
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
    document.getElementById('vaciarCarrito').addEventListener('click', vaciarCarrito);
});
