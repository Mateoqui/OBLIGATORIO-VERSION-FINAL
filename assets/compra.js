let carrito = [];
let totalCompra = 0;

function agregarAlCarrito(id) {
    const vj = videojuegos.find(vj => vj.id === id);
    const existeCarrito = carrito.find(car => car.idJuego == id);
    if(existeCarrito){
        carrito.forEach(carrito => {
            if(carrito.idJuego == vj.id) {
                carrito.cantidad += 1;
                carrito.precio += vj.precio;
            }
        });
    } else {
        const maxId = carrito.reduce((max, carrito) => (carrito.id > max ? carrito.id : max), 0);
        const car = {
            id: maxId+1,
            idJuego: vj.id,
            videojuego: vj.nombre,
            descripcion: vj.descripcion,
            genero: vj.genero,
            precio: vj.precio,
            cantidad: 1
        };
        carrito.push(car);
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoContainer = document.getElementById('carrito');
    carritoContainer.innerHTML = '';
    let total = 0;
    carrito.forEach(vj => {
        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.textContent = `${vj.videojuego} - $${vj.precio}`;
        carritoContainer.appendChild(item);
        total += vj.precio;
    });
    let cantidadTotal = 0;
    for(let i=0;i < carrito.length; i++)
    {
        cantidadTotal += carrito[i].cantidad;
    }
    totalCompra = cantidadTotal > 3 ? total * 0.85 : total;
    document.getElementById('total').textContent = totalCompra.toFixed(2);
}

function realizarCompra() { 
    if(carrito.length > 0)
    {
        guardarVentasEnLocalStorage();
        carrito = [];
        alert(`Compra realizada. Total: $${totalCompra.toFixed(2)}`);
        actualizarCarrito(); 
    }
    else
    {
        alert('Error, su carro está vacío.');
    }
}

function guardarVentasEnLocalStorage() {
    const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const videojuegos = JSON.parse(localStorage.getItem('videojuegos')) || [];
    const clienteSelect = document.getElementById('clienteSelect');
    const opcionSeleccionada = clienteSelect.value;
    let elCliente;

    for (let i = 0; i < clientes.length; i++) {
        if(opcionSeleccionada == clientes[i].id) {
            elCliente = clientes[i];
            break;
        }
    }

    const ahora = new Date(); 
    const fechaVenta = ahora.toLocaleDateString(); 
    const horaVenta = ahora.toLocaleTimeString();

    const maxId = ventas.reduce((max, venta) => (venta.id > max ? venta.id : max), 0);
    carrito.forEach(carrito => {
        const videojuego = videojuegos.find(t => t.nombre === carrito.videojuego);
        const venta = {
            id: maxId + 1,
            precio: videojuego.precio,
            fechaVenta: fechaVenta,
            horaVenta: horaVenta,
            cantidad: carrito.cantidad,
            videojuego: carrito.videojuego,
            cliente: elCliente
        };
        ventas.push(venta);
    });

    localStorage.setItem('ventas', JSON.stringify(ventas));
}