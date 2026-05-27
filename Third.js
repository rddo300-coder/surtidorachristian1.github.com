// Variables locales para referenciar los elementos del DOM
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('.blog-content'); // Contenedor de los planes
let articulosCarrito = [];

// Registrar todos los eventos
cargarEventListeners();

function cargarEventListeners() {
    // Cuando agregas un plan presionando "comprar"
    listaCursos.addEventListener('click', agregarPlan);

    // Eliminar un plan del carrito
    carrito.addEventListener('click', eliminarPlan);

    // Vaciar el carrito por completo
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // Reseteamos el arreglo
        limpiarHTML(); // Eliminamos todo el HTML de la tabla
    });
}

// --- Funciones ---

// Función que se activa al hacer clic en "comprar"
function agregarPlan(e) {
    e.preventDefault(); // Evita que la página salte hacia arriba al usar '#'
    
    // Nos aseguramos de que el usuario haya hecho clic en el botón correcto
    if (e.target.classList.contains('agregar-carrito')) {
        const planSeleccionado = e.target.parentElement.parentElement;
        leerDatosPlan(planSeleccionado);
    }
}

// Extrae la información de la tarjeta del plan
function leerDatosPlan(plan) {
    // Creamos un objeto con el contenido del plan actual
    const infoPlan = {
        imagen: plan.querySelector('img').src,
        titulo: plan.querySelector('h2').textContent,
        precio: "Precio a consultar", // Como no hay precio fijo en tu HTML, dejamos este texto por defecto
        id: plan.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisar si el elemento ya existe en el carrito para no duplicar filas
    const existe = articulosCarrito.some(planElemento => planElemento.id === infoPlan.id);
    
    if (existe) {
        // Actualizamos la cantidad
        articulosCarrito = articulosCarrito.map(planElemento => {
            if (planElemento.id === infoPlan.id) {
                planElemento.cantidad++;
                return planElemento; // Retorna el objeto actualizado
            } else {
                return planElemento; // Retorna los objetos que no son duplicados
            }
        });
    } else {
        // Agregamos el elemento al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoPlan];
    }

    carritoHTML();
}

// Muestra el arreglo de productos en el HTML del carrito
function carritoHTML() {
    // Limpiar el HTML previo para que no se acumule de forma desordenada
    limpiarHTML();

    // Recorre el carrito y genera el HTML para cada producto
    articulosCarrito.forEach(plan => {
        const { imagen, titulo, precio, cantidad, id } = plan;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="50" style="border-radius: 4px;">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td style="text-align: center;">${cantidad}</td>
            <td>
                <a href="#" class="borrar-plan" data-id="${id}" style="color: red; font-weight: bold; text-decoration: none;"> X </a>
            </td>
        `;

        // Agrega el HTML en el tbody de la tabla
        contenedorCarrito.appendChild(row);
    });
}

// Elimina un plan del carrito mediante el botón "X"
function eliminarPlan(e) {
    if (e.target.classList.contains('borrar-plan')) {
        const planId = e.target.getAttribute('data-id');
        
        // Filtra el arreglo para sacar el elemento que queremos borrar
        articulosCarrito = articulosCarrito.filter(plan => plan.id !== planId);
        
        carritoHTML(); // Volvemos a renderizar el carrito actualizado
    }
}

// Elimina los nodos hijos del contenedor de la tabla (bucle rápido y eficiente)
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}


