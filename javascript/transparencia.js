document.addEventListener('DOMContentLoaded', function() {
    const filtroAsociacion = document.getElementById('filtroAsociacion');
    const filtroAnio = document.getElementById('filtroAnio');
    const btnAplicarFiltros = document.querySelector('button[type="button"]');

    btnAplicarFiltros.addEventListener('click', function() {
        const asociacionId = filtroAsociacion.value;
        const anio = filtroAnio.value;
        
        if (asociacionId) {
            // Cargar reportes de la asociación
            fetch(`php/obtener_reportes.php?asociacion_id=${asociacionId}&anio=${anio}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Reportes cargados:', data);
                    // Aquí actualizarías la UI con los reportes
                    alert('Filtros aplicados (demo). Se cargarían los reportes de transparencia.');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            alert('Selecciona una asociación para ver sus reportes');
        }
    });
});