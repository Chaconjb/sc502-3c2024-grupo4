document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedorAsociaciones');
    const btnFiltro = document.getElementById('btnAplicarFiltros');
    const inputNombre = document.getElementById('filtroNombre');
    const selectProvincia = document.getElementById('filtroProvincia');

    const renderizarAsociaciones = (lista) => {
        contenedor.innerHTML = '';

        if (lista.length === 0) {
            contenedor.innerHTML = '<div class="col-12 text-center text-white"><h3>No se encontraron resultados.</h3></div>';
            return;
        }
        lista.forEach(aso => {
            contenedor.innerHTML += `
                <div class="col-md-4 mb-4">
                    <article class="card h-100 shadow-sm border-0">
                        <div class="card-body d-flex flex-column">
                            <h2 class="h5 text-primary fw-bold">${aso.nombre_asociacion}</h2>
                            <p class="mb-1 text-muted"><strong>📍 Ubicación:</strong> ${aso.provincia}</p>
                            <p class="flex-grow-1 mt-2">${aso.mision || 'Sin descripción.'}</p>
                            <div class="mt-3 d-flex justify-content-between align-items-center">
                                <span class="badge bg-success">Activa</span>
                                <a href="asociacion-detalles.html?id=${aso.asociacion_id}" class="btn btn-primary btn-sm">
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
        contenedor.innerHTML = '<p class="text-white text-center">...</p>';
        
        const nombre = inputNombre.value;
        const provincia = selectProvincia.value;

        try {
            const url = `php/obtener_asociaciones.php?nombre=${encodeURIComponent(nombre)}&provincia=${encodeURIComponent(provincia)}`;
            const resp = await fetch(url);
            const datos = await resp.json();
            
            console.log("Datos recibidos para renderizar:", datos);
            renderizarAsociaciones(datos);

        } catch (error) {
            console.error("Error:", error);
            contenedor.innerHTML = '<p class="text-white text-center">Error al conectar con el servidor.</p>';
        }
    };
    btnFiltro.addEventListener('click', buscarAsociaciones);
    buscarAsociaciones();
});