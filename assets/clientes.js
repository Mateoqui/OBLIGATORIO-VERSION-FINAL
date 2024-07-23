let clientes = [];
let editIndex = null;

document.addEventListener("DOMContentLoaded", () => {
    cargarClientesDeLocalStorage();
    mostrarClientes();
});

function cargarClientesDeLocalStorage() {
    const data = localStorage.getItem('clientes');
    if (data) {
        clientes = JSON.parse(data);
    }
}

function guardarClientesEnLocalStorage() {
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

function crearCliente() {
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const cedula = document.getElementById('cedula').value;
    const telefono = document.getElementById('telefono').value;

    const nuevoCliente = { id: parseInt(id), nombre, apellido, cedula: parseInt(cedula), telefono: parseInt(telefono)};
    clientes.push(nuevoCliente);
    guardarClientesEnLocalStorage();
    mostrarClientes();
    limpiarFormulario();
    alert("¡Cliente agregado con éxito!");
}

function mostrarClientes() {
    const lista = document.getElementById('listaClientes');
    lista.innerHTML = '';
    clientes.forEach((cl, index) => {
        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.innerHTML = `
            ${cl.nombre} - ${cl.apellido} - ${cl.cedula} - ${cl.telefono} 
            <button class="btn btn-sm btn-warning" onclick="editarCliente(${index})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="eliminarCliente(${index})">Eliminar</button>
        `;
        lista.appendChild(item);
    });
}

function editarCliente(index) {
    const cl = clientes[index];
    document.getElementById('id').value = cl.id;
    document.getElementById('nombre').value = cl.nombre;
    document.getElementById('apellido').value = cl.apellido;
    document.getElementById('cedula').value = cl.cedula;
    document.getElementById('telefono').value = cl.telefono;

    document.getElementById('updateBtn').style.display = 'inline-block';
    editIndex = index;
}

function actualizarCliente() {
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const cedula = document.getElementById('cedula').value;
    const telefono = document.getElementById('telefono').value;

    clientes[editIndex] = { id: parseInt(id), nombre, apellido, cedula: parseInt(cedula), telefono: parseInt(telefono)};
    guardarClientesEnLocalStorage();
    mostrarClientes();
    limpiarFormulario();
    document.getElementById('updateBtn').style.display = 'none';
    alert("¡Cliente actualizado con éxito!");
}

function eliminarCliente(index) {
    clientes.splice(index, 1);
    guardarClientesEnLocalStorage();
    mostrarClientes();
}

function limpiarFormulario() {
    document.getElementById('id').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('cedula').value = '';
    document.getElementById('telefono').value = '';
    editIndex = null;
}