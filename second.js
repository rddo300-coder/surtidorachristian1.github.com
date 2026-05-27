// --- 1. Variables Globales ---
const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('#lista-2'); // Contenedor principal de productos
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

// --- 2. Registrar los Listeners (Escuchadores de eventos) ---
cargarEventListeners();

function cargarEventListeners() {
    // Cuando agregas un producto presionando "Agregar"
    listaProductos.addEventListener('click', agregarProducto);

    // Elimina productos del carrito
    carrito.addEventListener('click', eliminarProducto);

    // Vaciar el carrito completamente
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // Reseteamos el arreglo
        limpiarHTML(); // Eliminamos todo el HTML de la tabla
    });
}

// --- 3. Funciones ---

// Función que se activa al presionar "Agregar"
function agregarProducto(e) {
    e.preventDefault(); // Evitamos que la página salte al inicio por el '#' del enlace
    
    // Nos aseguramos de que el usuario hizo clic en el botón correcto
    if (e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
    }
}

// Lee el HTML del producto al que le dimos clic y extrae su información
function leerDatosProducto(producto) {
    // Creamos un objeto con el contenido del producto actual
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito para sumar la cantidad en vez de duplicarlo
    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);
    if (existe) {
        // Actualizamos la cantidad
        const productos = articulosCarrito.map(producto => {
            if (producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto; // retorna el objeto actualizado
            } else {
                return producto; // retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...productos];
    } else {
        
        articulosCarrito = [...articulosCarrito, infoProducto];
    }

    carritoHTML();
}

// Elimina un producto del carrito en el HTML
function eliminarProducto(e) {
    if (e.target.classList.contains('borrar-producto')) {
        const productoId = e.target.getAttribute('data-id');
        
        // Filtra el arreglo para sacar el producto que queremos borrar
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
        
        carritoHTML(); // Volvemos a iterar sobre el carrito para actualizar el HTML
    }
}

// Muestra el carrito de compras en el HTML de la tabla
function carritoHTML() {
    // Limpiar el HTML previo para que no se dupliquen las filas viejas
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach(producto => {
        const { imagen, titulo, precio, cantidad, id } = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="60" style="border-radius: 4px;">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${id}" style="color: red; font-weight: bold; text-decoration: none;"> X </a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

// Elimina los productos del tbody (limpieza eficiente)
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}