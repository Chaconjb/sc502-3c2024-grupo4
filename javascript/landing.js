// landing.js - CREA ESTE ARCHIVO NUEVO en la carpeta javascript
document.addEventListener('DOMContentLoaded', function() {
    // Cargar asociaciones destacadas
    const asociacionesDestacadas = [
        {
            id: 1,
            nombre: "Refugio Patitas Felices",
            descripcion: "Rescate y rehabilitación de animales en situación de calle",
            imagen: "https://cdn.pixabay.com/photo/2016/02/19/15/46/dog-1210559_1280.jpg",
            necesidades: ["Alimento", "Medicinas", "Vacunas"],
            progreso: 25,
            meta: 500000
        },
        {
            id: 2,
            nombre: "Amigos de los Animales",
            descripcion: "Esterilización y adopción responsable",
            imagen: "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg",
            necesidades: ["Esterilizaciones", "Campañas de adopción"],
            progreso: 60,
            meta: 300000
        },
        {
            id: 3,
            nombre: "Salvando Huellitas",
            descripcion: "Atención veterinaria para animales en estado crítico",
            imagen: "https://cdn.pixabay.com/photo/2015/11/17/13/13/dog-1047518_1280.jpg",
            necesidades: ["Cirugías", "Tratamientos", "Hospitalización"],
            progreso: 40,
            meta: 750000
        }
    ];

    const container = document.getElementById('asociaciones-destacadas');
    
    asociacionesDestacadas.forEach(asoc => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        
        col.innerHTML = `
            <div class="card association-card h-100 shadow-sm">
                <img src="${asoc.imagen}" class="card-img-top" alt="${asoc.nombre}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${asoc.nombre}</h5>
                    <p class="card-text flex-grow-1">${asoc.descripcion}</p>
                    <h6 class="mt-2">Necesidades:</h6>
                    <ul class="mb-3">
                        ${asoc.necesidades.map(need => `<li>${need}</li>`).join('')}
                    </ul>
                    <div class="mb-2">
                        <small class="text-muted">Progreso: ${asoc.progreso}%</small>
                        <div class="progress">
                            <div class="progress-bar" style="width: ${asoc.progreso}%"></div>
                        </div>
                    </div>
                    <a href="asociacion-detalle.html?id=${asoc.id}" class="btn btn-primary mt-auto">Ver Detalles</a>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });

    // Actualizar navbar si el usuario está logueado
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado) {
        const usuario = JSON.parse(usuarioLogueado);
        const loginNav = document.getElementById('login-nav');
        if (loginNav) {
            loginNav.innerHTML = `<i class="bi bi-person-circle me-1"></i>${usuario.nombre}`;
            loginNav.href = "home.html";
        }
    }
});