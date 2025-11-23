// transparencia.js
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está logueado para actualizar navbar
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado) {
        const usuario = JSON.parse(usuarioLogueado);
        const loginNav = document.getElementById('login-nav');
        if (loginNav) {
            loginNav.innerHTML = `<i class="bi bi-person-circle me-1"></i>${usuario.nombre}`;
            loginNav.href = "home.html";
        }
    }

    // Cargar datos de transparencia
    cargarEstadisticas();
    cargarReportes();
    cargarGraficoDistribucion();
    cargarImpacto();

    // Configurar event listeners para filtros
    document.getElementById('filtro-asociacion').addEventListener('change', filtrarReportes);
    document.getElementById('filtro-fecha-inicio').addEventListener('change', filtrarReportes);
    document.getElementById('filtro-fecha-fin').addEventListener('change', filtrarReportes);
});

function cargarEstadisticas() {
    // Simular datos de estadísticas
    const estadisticas = {
        totalRecaudado: 1250000,
        totalDonaciones: 45,
        asociacionesBeneficiadas: 6,
        animalesAyudados: 120
    };

    document.getElementById('total-recaudado').textContent = `₡${estadisticas.totalRecaudado.toLocaleString()}`;
    document.getElementById('total-donaciones').textContent = estadisticas.totalDonaciones;
    document.getElementById('asociaciones-beneficiadas').textContent = estadisticas.asociacionesBeneficiadas;
    document.getElementById('animales-ayudados').textContent = estadisticas.animalesAyudados;
}

function cargarReportes() {
    // Simular datos de reportes
    const reportes = [
        {
            id: 1,
            asociacion: "Refugio Patitas Felices",
            periodo: "Enero 2024",
            totalRecaudado: 125000,
            animalesAyudados: 25,
            fecha: "2024-01-31"
        },
        {
            id: 2,
            asociacion: "Amigos de los Animales",
            periodo: "Enero 2024",
            totalRecaudado: 85000,
            animalesAyudados: 18,
            fecha: "2024-01-31"
        },
        {
            id: 3,
            asociacion: "Salvando Huellitas",
            periodo: "Enero 2024",
            totalRecaudado: 150000,
            animalesAyudados: 32,
            fecha: "2024-01-31"
        },
        {
            id: 4,
            asociacion: "Refugio Patitas Felices",
            periodo: "Diciembre 2023",
            totalRecaudado: 98000,
            animalesAyudados: 20,
            fecha: "2023-12-31"
        }
    ];

    // Llenar select de asociaciones
    const selectAsociacion = document.getElementById('filtro-asociacion');
    const asociacionesUnicas = [...new Set(reportes.map(r => r.asociacion))];
    
    asociacionesUnicas.forEach(asoc => {
        const option = document.createElement('option');
        option.value = asoc;
        option.textContent = asoc;
        selectAsociacion.appendChild(option);
    });

    mostrarReportes(reportes);
}

function mostrarReportes(reportes) {
    const tbody = document.getElementById('tabla-reportes').querySelector('tbody');
    tbody.innerHTML = '';

    reportes.forEach(reporte => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${reporte.asociacion}</td>
            <td>${reporte.periodo}</td>
            <td>₡${reporte.totalRecaudado.toLocaleString()}</td>
            <td>${reporte.animalesAyudados}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="verReporte(${reporte.id})">
                    <i class="bi bi-eye me-1"></i>Ver
                </button>
                <button class="btn btn-sm btn-outline-secondary" onclick="descargarReporte(${reporte.id})">
                    <i class="bi bi-download me-1"></i>PDF
                </button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}




function filtrarReportes() {
    const asociacion = document.getElementById('filtro-asociacion').value;
    const fechaInicio = document.getElementById('filtro-fecha-inicio').value;
    const fechaFin = document.getElementById('filtro-fecha-fin').value;

    // En una implementación real, aquí se haría una petición al servidor
    // Por ahora, simulamos el filtrado con los datos existentes
    console.log('Filtrando reportes:', { asociacion, fechaInicio, fechaFin });
    
    // Mostrar mensaje de que se están aplicando filtros
    alert('Los filtros se han aplicado. En una implementación real, se cargarían los reportes filtrados del servidor.');
}

function verReporte(id) {
    alert(`Viendo reporte con ID: ${id}\nEn una implementación real, se mostraría el reporte completo.`);
}

function descargarReporte(id) {
    alert(`Descargando reporte con ID: ${id} en formato PDF.\nEn una implementación real, se generaría y descargaría el PDF.`);
}