document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedorTransparencia');
    const btnFiltro = document.getElementById('btnAplicarFiltros');
    const selectAsociacion = document.getElementById('filtroAsociacion');
    const selectAnio = document.getElementById('filtroAnio');

    const renderizarReportes = (reportes) => {
        contenedor.innerHTML = ''; 

        if (reportes.length === 0) {
            contenedor.innerHTML = '<div class="col-12 text-center text-white"><h3>No hay reportes disponibles.</h3></div>';
            return;
        }

        reportes.forEach(rep => {
            const montoValor = rep.monto_utilizado;

            const montoFormateado = new Intl.NumberFormat('es-CR', {
                style: 'currency',
                currency: 'CRC',
                minimumFractionDigits: 0
            }).format(montoValor);

            contenedor.innerHTML += `
        <div class="col-md-6 mb-4">
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body">
                    <span class="badge bg-primary mb-2">${rep.nombre_asociacion}</span>
                    <h5 class="fw-bold">${rep.titulo}</h5>
                    <p class="text-secondary small">Fecha: ${rep.fecha_publicacion}</p>
                    <p>${rep.descripcion}</p>
                    <p class="fw-bold text-success mt-3">Monto: ${montoFormateado}</p>
                </div>
            </div>
        </div>`;
        });
    };

    const cargarReportes = async () => {
        contenedor.innerHTML = '<p class="text-center text-white">Cargando...</p>';

        const aso = selectAsociacion ? selectAsociacion.value : '';
        const anio = selectAnio ? selectAnio.value : '';

        try {
            const url = `php/obtener_transparencia.php?asociacion=${encodeURIComponent(aso)}&anio=${encodeURIComponent(anio)}&v=${Date.now()}`;
            const resp = await fetch(url);
            const datos = await resp.json();

            console.log("Datos para renderizar:", datos);
            renderizarReportes(datos);
        } catch (error) {
            console.error("Error:", error);
            contenedor.innerHTML = '<p class="text-center text-danger">Error al cargar datos.</p>';
        }
    };

    if (btnFiltro) {
        btnFiltro.addEventListener('click', (e) => {
            e.preventDefault();
            cargarReportes();
        });
    }

    cargarReportes();
});