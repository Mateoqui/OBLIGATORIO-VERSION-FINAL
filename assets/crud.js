let videojuegos = [];
let editIndex = null;

document.addEventListener("DOMContentLoaded", () => {
    cargarVideojuegosDeLocalStorage();
    mostrarVideojuegos();
});

function cargarVideojuegosDeLocalStorage() {
    const data = localStorage.getItem('videojuegos');
    if (data) {
        videojuegos = JSON.parse(data);
    }
}

function guardarVideojuegosEnLocalStorage() {
    localStorage.setItem('videojuegos', JSON.stringify(videojuegos));
}

function crearVideojuego() {
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const categoria = document.getElementById('categoria').value;

    const nuevoVideojuego = { id: parseInt(id), nombre, descripcion, precio: parseFloat(precio), categoria };
    videojuegos.push(nuevoVideojuego);
    guardarVideojuegosEnLocalStorage();
    mostrarVideojuegos();
    limpiarFormulario();
}

function mostrarVideojuegos() {
    const lista = document.getElementById('listaVideojuegos');
    lista.innerHTML = '';
    videojuegos.forEach((vj, index) => {
        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.innerHTML = `
            ${vj.nombre} - $${vj.precio} 
            <button class="btn btn-sm btn-warning" onclick="editarVideojuego(${index})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="eliminarVideojuego(${index})">Eliminar</button>
        `;
        lista.appendChild(item);
    });
}

function editarVideojuego(index) {
    const vj = videojuegos[index];
    document.getElementById('id').value = vj.id;
    document.getElementById('nombre').value = vj.nombre;
    document.getElementById('descripcion').value = vj.descripcion;
    document.getElementById('precio').value = vj.precio;
    document.getElementById('categoria').value = vj.categoria;

    document.getElementById('updateBtn').style.display = 'inline-block';
    editIndex = index;
}

function actualizarVideojuego() {
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const categoria = document.getElementById('categoria').value;

    videojuegos[editIndex] = { id: parseInt(id), nombre, descripcion, precio: parseFloat(precio), categoria };
    guardarVideojuegosEnLocalStorage();
    mostrarVideojuegos();
    limpiarFormulario();
    document.getElementById('updateBtn').style.display = 'none';
}

function eliminarVideojuego(index) {
    videojuegos.splice(index, 1);
    guardarVideojuegosEnLocalStorage();
    mostrarVideojuegos();
}

function limpiarFormulario() {
    document.getElementById('id').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('categoria').value = '';
    editIndex = null;
}