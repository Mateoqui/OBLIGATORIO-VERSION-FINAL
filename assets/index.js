let videojuegos = [];
let clientes = [];

document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem('videojuegos')){
        precargaVideojuegos();
    }
    if (!localStorage.getItem('clientes')){
        precargaCliente();
    }
    cargarClientesDeLocalStorage();
    cargarVideojuegosDeLocalStorage();
    cargarVideojuegos(videojuegos);
    cargarClientesEnSelect();
});

function precargaVideojuegos()
{
    let nuevoVideoJuego = {id: 4, nombre: 'Sekiro', descripcion: 'Juego de historia japonesa', precio: 20, categoria: 'accion'};
    videojuegos.push(nuevoVideoJuego);
    nuevoVideoJuego = {id: 5, nombre: 'Dead By Daylight', descripcion: 'Juego de terror', precio: 10, categoria: 'accion'};
    videojuegos.push(nuevoVideoJuego);
    nuevoVideoJuego = {id: 6, nombre: 'Age of empires 2', descripcion: 'Juego de estrategia', precio: 10, categoria: 'estrategia'};
    videojuegos.push(nuevoVideoJuego);
    localStorage.setItem('videojuegos', JSON.stringify(videojuegos));
}

function precargaCliente()
{
    let nuevoCliente = {id: 1, nombre: 'Mateo', apellido: 'Quiroga', cedula: '5342532', telefono: '094563213'};
    clientes.push(nuevoCliente);
    nuevoCliente = {id: 2, nombre: 'Eduardo', apellido: 'Rodriguez', cedula: '53235432', telefono: '095354213'};
    clientes.push(nuevoCliente);
    nuevoCliente = {id: 3, nombre: 'Luis', apellido: 'Perez', cedula: '53235343', telefono: '095354123'};
    clientes.push(nuevoCliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

function cargarVideojuegosDeLocalStorage() {
    const data = localStorage.getItem('videojuegos');
    if (data) {
        videojuegos = JSON.parse(data);
    }
}

function cargarClientesDeLocalStorage() {
    const data = localStorage.getItem('clientes');
    if (data) {
        clientes = JSON.parse(data);
    }
}

function cargarClientesEnSelect(){
    let selectElement = document.getElementById('clienteSelect');
    selectElement.innerHTML = '';

    for (let i = 0; i < clientes.length; i++) {
        let opcion = clientes[i];
        let option = document.createElement('option');
        option.value = opcion.id;
        option.textContent = opcion.nombre + " | " + opcion.apellido + " | " + opcion.cedula + " | " + opcion.telefono ;
        selectElement.appendChild(option);
    }
}

function cargarVideojuegos(videojuegos) {
    const container = document.getElementById('videojuegosContainer');
    container.innerHTML = '';
    videojuegos.forEach(vj => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">${vj.nombre}</h5>
                    <p class="card-text">${vj.descripcion}</p>
                    <p class="card-text">$${vj.precio}</p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito(${vj.id})">Agregar al Carrito</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function filtrarPorCategoria() {
    const categoria = document.getElementById('categoriaSelect').value;
    const filtrados = categoria === 'todos' ? videojuegos : videojuegos.filter(vj => vj.categoria === categoria);
    cargarVideojuegos(filtrados);
}