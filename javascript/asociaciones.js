
// asociaciones.js
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

    // Cargar asociaciones
    cargarAsociaciones();

    // Configurar event listeners para filtros
    document.getElementById('filtro-ubicacion').addEventListener('change', filtrarAsociaciones);
    document.getElementById('filtro-categoria').addEventListener('change', filtrarAsociaciones);
    document.getElementById('filtro-orden').addEventListener('change', ordenarAsociaciones);
    document.getElementById('buscar-asociaciones').addEventListener('input', buscarAsociaciones);
    document.getElementById('boton-buscar').addEventListener('click', buscarAsociaciones);
    document.getElementById('cargar-mas').addEventListener('click', cargarMasAsociaciones);
});

let todasLasAsociaciones = [];
let asociacionesMostradas = 6;

function cargarAsociaciones() {
    // Simular datos de asociaciones
    todasLasAsociaciones = [
        {
            id: 1,
            nombre: "Refugio Patitas Felices",
            descripcion: "Rescate y rehabilitación de animales en situación de calle",
            imagen: "https://cdn.pixabay.com/photo/2016/02/19/15/46/dog-1210559_1280.jpg",
            ubicacion: "san-jose",
            categoria: "rescate",
            necesidades: ["Alimento", "Medicinas", "Vacunas"],
            progreso: 25,
            meta: 500000,
            recaudado: 125000,
            fechaRegistro: "2024-01-15",
            telefono: "2222-1111",
            email: "patitas@ejemplo.com"
        },
        {
            id: 2,
            nombre: "Amigos de los Animales",
            descripcion: "Esterilización y adopción responsable",
            imagen: "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg",
            ubicacion: "alajuela",
            categoria: "esterilizacion",
            necesidades: ["Esterilizaciones", "Campañas de adopción"],
            progreso: 60,
            meta: 300000,
            recaudado: 180000,
            fechaRegistro: "2024-01-10",
            telefono: "2222-2222",
            email: "amigos@ejemplo.com"
        },
        {
            id: 3,
            nombre: "Salvando Huellitas",
            descripcion: "Atención veterinaria para animales en estado crítico",
            imagen: "https://cdn.pixabay.com/photo/2015/11/17/13/13/dog-1047518_1280.jpg",
            ubicacion: "cartago",
            categoria: "veterinaria",
            necesidades: ["Cirugías", "Tratamientos", "Hospitalización"],
            progreso: 40,
            meta: 750000,
            recaudado: 300000,
            fechaRegistro: "2024-01-05",
            telefono: "2222-3333",
            email: "huellitas@ejemplo.com"
        },
        {
            id: 4,
            nombre: "Hogar de Mascotas",
            descripcion: "Albergue temporal y adopción de mascotas abandonadas",
            imagen: "https://cdn.pixabay.com/photo/2017/04/06/10/54/dog-2207865_1280.jpg",
            ubicacion: "heredia",
            categoria: "adopcion",
            necesidades: ["Alimento", "Cobijas", "Juguetes"],
            progreso: 75,
            meta: 200000,
            recaudado: 150000,
            fechaRegistro: "2024-01-20",
            telefono: "2222-4444",
            email: "hogar@ejemplo.com"
        },
        {
            id: 5,
            nombre: "Protectores Animales",
            descripcion: "Defensa y protección de animales en riesgo",
            imagen: "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_1280.jpg",
            ubicacion: "guanacaste",
            categoria: "rescate",
            necesidades: ["Transporte", "Refugio", "Alimento"],
            progreso: 30,
            meta: 600000,
            recaudado: 180000,
            fechaRegistro: "2024-01-18",
            telefono: "2222-5555",
            email: "protectores@ejemplo.com"
        },
        {
            id: 6,
            nombre: "Vida Animal",
            descripcion: "Cuidado integral y rehabilitación de fauna silvestre",
            imagen: "https://cdn.pixabay.com/photo/2017/07/25/01/22/cat-2536662_1280.jpg",
            ubicacion: "puntarenas",
            categoria: "veterinaria",
            necesidades: ["Medicinas", "Equipo médico", "Alimento especializado"],
            progreso: 50,
            meta: 400000,
            recaudado: 200000,
            fechaRegistro: "2024-01-12",
            telefono: "2222-6666",
            email: "vida@ejemplo.com"
        }
    ];

    mostrarAsociaciones(todasLasAsociaciones.slice(0, asociacionesMostradas));
}

function mostrarAsociaciones(asociaciones) {
    const container = document.getElementById('lista-asociaciones');
    container.innerHTML = '';

    if (asociaciones.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="card">
                    <div class="card-body">
                        <i class="bi bi-search display-1 text-muted"></i>
                        <h4 class="text-muted">No se encontraron asociaciones</h4>
                        <p>Intenta con otros filtros de búsqueda.</p>
                    </div>
                </div>
            </div>
        `;
        return;
    }

    asociaciones.forEach(asoc => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        
        col.innerHTML = `
            <div class="card association-card h-100 shadow-sm">
                <img src="${asoc.imagen}" class="card-img-top" alt="${asoc.nombre}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${asoc.nombre}</h5>
                    <p class="card-text flex-grow-1">${asoc.descripcion}</p>
                    
                    <div class="mb-2">
                        <small class="text-muted">
                            <i class="bi bi-geo-alt me-1"></i>${obtenerNombreUbicacion(asoc.ubicacion)}
                        </small>
                    </div>
                    
                    <h6 class="mt-2">Necesidades:</h6>
                    <ul class="mb-3">
                        ${asoc.necesidades.map(need => `<li>${need}</li>`).join('')}
                    </ul>
                    
                    <div class="mb-2">
                        <small class="text-muted">Progreso: ${asoc.progreso}% (₡${asoc.recaudado.toLocaleString()} de ₡${asoc.meta.toLocaleString()})</small>
                        <div class="progress">
                            <div class="progress-bar" style="width: ${asoc.progreso}%"></div>
                        </div>
                    </div>
                    
                    <div class="d-grid gap-2 mt-auto">
                        <a href="asociacion-detalle.html?id=${asoc.id}" class="btn btn-outline-primary">Ver Detalles</a>
                        <a href="donacion.html?asociacion=${asoc.id}" class="btn btn-primary">Donar Ahora</a>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });

    // Mostrar u ocultar botón "Cargar más"
    const cargarMasBtn = document.getElementById('cargar-mas');
    if (asociaciones.length < todasLasAsociaciones.length) {
        cargarMasBtn.style.display = 'block';
    } else {
        cargarMasBtn.style.display = 'none';
    }
}

function obtenerNombreUbicacion(codigo) {
    const ubicaciones = {
        'san-jose': 'San José',
        'alajuela': 'Alajuela',
        'cartago': 'Cartago',
        'heredia': 'Heredia',
        'guanacaste': 'Guanacaste',
        'puntarenas': 'Puntarenas',
        'limon': 'Limón'
    };
    return ubicaciones[codigo] || codigo;
}

function filtrarAsociaciones() {
    const ubicacion = document.getElementById('filtro-ubicacion').value;
    const categoria = document.getElementById('filtro-categoria').value;
    
    let asociacionesFiltradas = todasLasAsociaciones;

    if (ubicacion) {
        asociacionesFiltradas = asociacionesFiltradas.filter(asoc => asoc.ubicacion === ubicacion);
    }

    if (categoria) {
        asociacionesFiltradas = asociacionesFiltradas.filter(asoc => asoc.categoria === categoria);
    }

    asociacionesMostradas = 6;
    mostrarAsociaciones(asociacionesFiltradas.slice(0, asociacionesMostradas));
}

function ordenarAsociaciones() {
    const orden = document.getElementById('filtro-orden').value;
    let asociacionesOrdenadas = [...todasLasAsociaciones];

    switch (orden) {
        case 'nombre':
            asociacionesOrdenadas.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'recientes':
            asociacionesOrdenadas.sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro));
            break;
        case 'donaciones':
            asociacionesOrdenadas.sort((a, b) => b.recaudado - a.recaudado);
            break;
    }

    mostrarAsociaciones(asociacionesOrdenadas.slice(0, asociacionesMostradas));
}

function buscarAsociaciones() {
    const termino = document.getElementById('buscar-asociaciones').value.toLowerCase();
    
    if (termino.trim() === '') {
        mostrarAsociaciones(todasLasAsociaciones.slice(0, asociacionesMostradas));
        return;
    }

    const asociacionesFiltradas = todasLasAsociaciones.filter(asoc => 
        asoc.nombre.toLowerCase().includes(termino) ||
        asoc.descripcion.toLowerCase().includes(termino) ||
        asoc.necesidades.some(need => need.toLowerCase().includes(termino))
    );

    asociacionesMostradas = 6;
    mostrarAsociaciones(asociacionesFiltradas.slice(0, asociacionesMostradas));
}

function cargarMasAsociaciones() {
    asociacionesMostradas += 3;
    const ubicacion = document.getElementById('filtro-ubicacion').value;
    const categoria = document.getElementById('filtro-categoria').value;
    
    let asociacionesFiltradas = todasLasAsociaciones;

    if (ubicacion) {
        asociacionesFiltradas = asociacionesFiltradas.filter(asoc => asoc.ubicacion === ubicacion);
    }

    if (categoria) {
        asociacionesFiltradas = asociacionesFiltradas.filter(asoc => asoc.categoria === categoria);
    }

    mostrarAsociaciones(asociacionesFiltradas.slice(0, asociacionesMostradas));
}