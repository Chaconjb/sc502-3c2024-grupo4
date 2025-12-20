// Verificar si el usuario está logueado
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userName = sessionStorage.getItem('userName');
    
    if (isLoggedIn && userName) {
        // Actualizar la UI para mostrar nombre de usuario
        console.log(`Bienvenido de nuevo, ${userName}`);
    }
});
document.addEventListener('DOMContentLoaded', async () => {
    const contenedor = document.getElementById('contenedorRecientes');

    const cargarImpactoHome = async () => {
        try {
            // Reutilizamos tu PHP de transparencia
            const resp = await fetch('php/obtener_transparencia.php?t=' + Date.now());
            const datos = await resp.json();

            if (datos.error) return;

            // 1. Actualizar contadores (Simulados basados en la data real)
            document.getElementById('countAsociaciones').innerText = [...new Set(datos.map(d => d.nombre_asociacion))].length;
            document.getElementById('countReportes').innerText = datos.length;
            
            const total = datos.reduce((sum, item) => sum + parseFloat(item.monto_utilizado || 0), 0);
            document.getElementById('totalDonado').innerText = total.toLocaleString('es-CR');

            // 2. Mostrar solo los 3 más recientes
            contenedor.innerHTML = '';
            const recientes = datos.slice(0, 3);

            recientes.forEach(rep => {
                contenedor.innerHTML += `
                    <div class="col-md-4">
                        <div class="card h-100 border-0 shadow-sm p-3">
                            <span class="badge bg-info text-dark w-fit mb-2" style="width: fit-content;">${rep.nombre_asociacion}</span>
                            <h5 class="fw-bold">${rep.titulo}</h5>
                            <p class="text-muted small">${rep.descripcion.substring(0, 80)}...</p>
                            <p class="fw-bold text-success mb-0">Monto: ₡${parseFloat(rep.monto_utilizado).toLocaleString()}</p>
                        </div>
                    </div>
                `;
            });

        } catch (error) {
            console.error("Error cargando home:", error);
            contenedor.innerHTML = '<p class="text-center text-muted">Explora nuestras secciones para ver más.</p>';
        }
    };

    cargarImpactoHome();
});