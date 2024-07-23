document.addEventListener("DOMContentLoaded", () => {
    mostrarEstadisticas();
});

function cargarVentasDeLocalStorage() {
    const data = localStorage.getItem('ventas');
    return data ? JSON.parse(data) : [];
}

function mostrarEstadisticas() {
    const ventas = cargarVentasDeLocalStorage();
    const tablaVentas = document.getElementById('tablaVentas');
    
    tablaVentas.innerHTML = '';
    const totalIngresosElement = document.getElementById('totalIngresos');
    let totalIngresos = 0;

    for (let i = 0; i < ventas.length; i++) {
        const venta = ventas[i];
        const { cliente, precio, videojuego, cantidad, fechaVenta, horaVenta } = venta;
        let totalVenta = precio * cantidad;
        if(cantidad > 3){
            totalVenta = precio * cantidad * 0.85; 
        }
        totalIngresos += totalVenta;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cliente.cedula} ${cliente.nombre} ${cliente.apellido}</td>
            <td>${videojuego}</td>
            <td>$${precio.toFixed(2)}</td>
            <td>${cantidad}</td>
            <td>${fechaVenta} ${horaVenta}</td>
            <td>$${totalVenta.toFixed(2)}</td>
        `;
        tablaVentas.appendChild(fila);
    }
    totalIngresosElement.textContent = totalIngresos.toFixed(2);
}