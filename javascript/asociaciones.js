document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedorAsociaciones');
    const btnFiltro = document.getElementById('btnAplicarFiltros');
    const inputNombre = document.getElementById('filtroNombre');
    const selectProvincia = document.getElementById('filtroProvincia');

    if (!contenedor) {
        console.error("Error: No se encontró el elemento 'contenedorAsociaciones'.");
        return;
    }
    const renderizarAsociaciones = (lista) => {
        contenedor.innerHTML = '';

        if (!lista || lista.length === 0) {
            contenedor.innerHTML = '<div class="col-12 text-center text-white"><h3>No se encontraron asociaciones.</h3></div>';
            return;
        }

        lista.forEach(aso => {
            contenedor.innerHTML += `
                <div class="col-md-4 mb-4">
                    <article class="card h-100 shadow-sm border-0">
                        <div class="card-body d-flex flex-column">
                            <h2 class="h5 text-primary fw-bold">${aso.nombre_asociacion}</h2>
                            <p class="mb-1 text-muted small"><strong>📍 Ubicación:</strong> ${aso.provincia || 'No especificada'}</p>
                            <p class="flex-grow-1 mt-2 small text-secondary">
                                ${aso.mision ? aso.mision.substring(0, 150) + '...' : 'Sin descripción disponible.'}
                            </p>
                            <div class="mt-3 d-flex justify-content-between align-items-center border-top pt-3">
                                <span class="badge bg-success-subtle text-success border border-success">Activa</span>
                                <a href="asociacion-detalles.html?id=${aso.asociacion_id}" class="btn btn-primary btn-sm px-3">
                                    Ver detalles
                                </a>
                            </div>
                        </div>
                    </article>
                </div>
            `;
        });
    };

    const buscarAsociaciones = async () => {
        contenedor.innerHTML = '<div class="col-12 text-center text-white"><p>Buscando asociaciones...</p></div>';
        
        const nombre = inputNombre ? inputNombre.value : '';
        const provincia = selectProvincia ? selectProvincia.value : '';

        try {
            const url = `php/obtener_asociaciones.php?nombre=${encodeURIComponent(nombre)}&provincia=${encodeURIComponent(provincia)}&t=${Date.now()}`;
            const resp = await fetch(url);
            
            if (!resp.ok) throw new Error("Error en la respuesta del servidor");

            const datos = await resp.json();
            console.log("Datos cargados:", datos);
            renderizarAsociaciones(datos);

        } catch (error) {
            console.error("Error en buscarAsociaciones:", error);
            contenedor.innerHTML = '<div class="col-12 text-center text-danger"><p>Error al cargar datos del servidor.</p></div>';
        }
    };

    if (btnFiltro) {
        btnFiltro.addEventListener('click', (e) => {
            e.preventDefault();
            buscarAsociaciones();
        });
    }

    buscarAsociaciones();
});