document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedorTransparencia');
    const btnFiltro = document.getElementById('btnAplicarFiltros');
    const selectAsociacion = document.getElementById('filtroAsociacion');
    const selectAnio = document.getElementById('filtroAnio');

    // Asignar evento al botón si existe
    if (btnFiltro) {
        btnFiltro.addEventListener('click', cargarReportes);
    }

    // También aplicar filtros al cambiar los selects
    if (selectAsociacion) {
        selectAsociacion.addEventListener('change', cargarReportes);
    }
    if (selectAnio) {
        selectAnio.addEventListener('change', cargarReportes);
    }

    function renderizarReportes(reportes) {
        if (!contenedor) {
            console.error('No se encontró el contenedor #contenedorTransparencia');
            return;
        }

        contenedor.innerHTML = '';

        if (!reportes || reportes.length === 0) {
            contenedor.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info text-center">
                        No hay reportes disponibles con los filtros seleccionados.
                    </div>
                </div>`;
            return;
        }

        reportes.forEach(rep => {
            const montoFormateado = new Intl.NumberFormat('es-CR', {
                style: 'currency',
                currency: 'CRC',
                minimumFractionDigits: 0
            }).format(rep.monto_utilizado);

            const fecha = new Date(rep.fecha_publicacion);
            const fechaFormateada = fecha.toLocaleDateString('es-CR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Determinar color del badge según la asociación
            let badgeClass = 'bg-primary';
            if (rep.nombre_asociacion.includes('Patitas')) badgeClass = 'bg-primary';
            else if (rep.nombre_asociacion.includes('Bigotes')) badgeClass = 'bg-info';
            else if (rep.nombre_asociacion.includes('Huellita')) badgeClass = 'bg-success';

            const reporteHTML = `
            <div class="col-md-6">
                <article class="card shadow-sm h-100">
                    <div class="card-body">
                        <span class="badge ${badgeClass} mb-2">${rep.nombre_asociacion}</span>
                        <h5 class="card-title fw-bold">${rep.titulo}</h5>
                        <p class="text-muted small mb-2">Publicado: ${fechaFormateada}</p>
                        <p class="card-text">${rep.descripcion}</p>
                        <div class="mt-3">
                            <strong>Monto utilizado:</strong> 
                            <span class="text-success fw-bold">${montoFormateado}</span>
                        </div>
                        ${rep.año ? `<p class="mt-2 small text-muted">Año: ${rep.año}</p>` : ''}
                    </div>
                </article>
            </div>`;

            contenedor.innerHTML += reporteHTML;
        });
    }

    async function cargarReportes() {
        if (!contenedor) return;

        contenedor.innerHTML = `
            <div class="col-12 text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p class="mt-2 text-white">Cargando reportes...</p>
            </div>`;

        try {
            const aso = selectAsociacion ? selectAsociacion.value : '';
            const anio = selectAnio ? selectAnio.value : '';

            const url = `php/obtener_transparencia.php?asociacion=${encodeURIComponent(aso)}&anio=${encodeURIComponent(anio)}&timestamp=${Date.now()}`;
            
            console.log('Solicitando URL:', url);
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            const datos = await response.json();
            console.log('Datos recibidos:', datos);
            
            renderizarReportes(datos);
        } catch (error) {
            console.error('Error al cargar reportes:', error);
            contenedor.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger">
                        Error al cargar los reportes: ${error.message}
                    </div>
                </div>`;
        }
    }

    // Cargar reportes al inicio
    cargarReportes();
});