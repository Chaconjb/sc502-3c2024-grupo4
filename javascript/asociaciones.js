document.addEventListener('DOMContentLoaded', function() {
    const filtroNombre = document.getElementById('filtroNombre');
    const filtroProvincia = document.getElementById('filtroProvincia');
    const btnAplicarFiltros = document.querySelector('button[type="button"]');

    // Cargar asociaciones al cargar la página
    cargarAsociaciones();

    btnAplicarFiltros.addEventListener('click', function() {
        cargarAsociaciones();
    });

    function cargarAsociaciones() {
        const params = new URLSearchParams();
        
        if (filtroNombre.value) params.append('nombre', filtroNombre.value);
        if (filtroProvincia.value) params.append('provincia', filtroProvincia.value);

        fetch(`php/obtener_asociaciones.php?${params.toString()}`)
            .then(response => response.json())
            .then(asociaciones => {
                // Aquí podrías actualizar dinámicamente las tarjetas
                console.log('Asociaciones cargadas:', asociaciones);
                // Mostrar mensaje de demo
                alert('Filtros aplicados (demo). En producción, se actualizarían las tarjetas.');
            })
            .catch(error => {
                console.error('Error al cargar asociaciones:', error);
            });
    }
});