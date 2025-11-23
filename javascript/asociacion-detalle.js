// asociacion-detalle.js
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

    // Obtener ID de la asociación desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const asociacionId = urlParams.get('id');

    if (asociacionId) {
        cargarDetalleAsociacion(parseInt(asociacionId));
    } else {
        // Redirigir a la página de asociaciones si no hay ID
        window.location.href = 'asociaciones.html';
    }

    // Configurar event listeners
    document.getElementById('boton-donar').addEventListener('click', function() {
        window.location.href = `donacion.html?asociacion=${asociacionId}`;
    });

    document.getElementById('boton-contactar').addEventListener('click', contactarAsociacion);
});

function cargarDetalleAsociacion(id) {
    // Simular datos de asociaciones (los mismos que en asociaciones.js)
    const asociaciones = [
        {
            id: 1,
            nombre: "Refugio Patitas Felices",
            descripcion: "Rescate y rehabilitación de animales en situación de calle",
            imagen: "https://cdn.pixabay.com/photo/2016/02/19/15/46/dog-1210559_1280.jpg",
            ubicacion: "San José",
            necesidades: ["Alimento", "Medicinas", "Vacunas"],
            progreso: 25,
            meta: 500000,
            recaudado: 125000,
            mision: "Brindar un hogar temporal y atención médica a animales en situación de calle, con el objetivo de encontrarles familias responsables y amorosas.",
            vision: "Ser el refugio líder en bienestar animal, reconocido por nuestra transparencia y compromiso con la comunidad.",
            telefono: "+506 2222-1111",
            email: "patitas@ejemplo.com",
            sitioWeb: "https://www.patitasfelices.com",
            direccion: "San José, Costa Rica",
            animalesRescatados: 45,
            donacionesRecibidas: 28
        },
        {
            id: 2,
            nombre: "Amigos de los Animales",
            descripcion: "Esterilización y adopción responsable",
            imagen: "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg",
            ubicacion: "Alajuela",
            necesidades: ["Esterilizaciones", "Campañas de adopción"],
            progreso: 60,
            meta: 300000,
            recaudado: 180000,
            mision: "Promover la esterilización como método de control poblacional y fomentar la adopción responsable de animales.",
            vision: "Una sociedad donde todos los animales tengan un hogar y sean tratados con respeto y dignidad.",
            telefono: "+506 2222-2222",
            email: "amigos@ejemplo.com",
            sitioWeb: "https://www.amigosanimales.org",
            direccion: "Alajuela, Costa Rica",
            animalesRescatados: 32,
            donacionesRecibidas: 15
        },
        {
            id: 3,
            nombre: "Salvando Huellitas",
            descripcion: "Atención veterinaria para animales en estado crítico",
            imagen: "https://cdn.pixabay.com/photo/2015/11/17/13/13/dog-1047518_1280.jpg",
            ubicacion: "Cartago",
            necesidades: ["Cirugías", "Tratamientos", "Hospitalización"],
            progreso: 40,
            meta: 750000,
            recaudado: 300000,
            mision: "Proporcionar atención veterinaria especializada a animales en estado crítico sin recursos económicos.",
            vision: "Ser el centro de referencia nacional para la atención de animales en situaciones críticas.",
            telefono: "+506 2222-3333",
            email: "huellitas@ejemplo.com",
            sitioWeb: "https://www.salvandohuellitas.cr",
            direccion: "Cartago, Costa Rica",
            animalesRescatados: 28,
            donacionesRecibidas: 12
        }
    ];

    const asociacion = asociaciones.find(a => a.id === id);

    if (!asociacion) {
        document.body.innerHTML = `
            <div class="container text-center py-5">
                <h1>Asociación no encontrada</h1>
                <p>La asociación que buscas no existe o ha sido removida.</p>
                <a href="asociaciones.html" class="btn btn-primary">Volver a Asociaciones</a>
            </div>
        `;
        return;
    }

    // Actualizar la página con los datos de la asociación
    actualizarInterfaz(asociacion);
    cargarMetas(asociacion);
    cargarAnimales(asociacion);
    cargarReportes(asociacion);
}

function actualizarInterfaz(asociacion) {
    // Actualizar información básica
    document.getElementById('asociacion-nombre').textContent = asociacion.nombre;
    document.getElementById('asociacion-ubicacion').textContent = asociacion.ubicacion;
    document.getElementById('asociacion-descripcion').textContent = asociacion.descripcion;
    document.getElementById('asociacion-mision').textContent = asociacion.mision;
    document.getElementById('asociacion-vision').textContent = asociacion.vision;
    
    // Actualizar imagen
    document.getElementById('asociacion-imagen').src = asociacion.imagen;
    document.getElementById('asociacion-imagen').alt = asociacion.nombre;
    
    // Actualizar necesidades
    const necesidadesList = document.getElementById('asociacion-necesidades');
    necesidadesList.innerHTML = '';
    asociacion.necesidades.forEach(need => {
        const li = document.createElement('li');
        li.textContent = need;
        necesidadesList.appendChild(li);
    });
    
    // Actualizar información de contacto
    document.getElementById('asociacion-email').textContent = asociacion.email;
    document.getElementById('asociacion-telefono').textContent = asociacion.telefono;
    document.getElementById('asociacion-sitio-web').href = asociacion.sitioWeb;
    document.getElementById('asociacion-sitio-web').textContent = 'Visitar sitio web';
    document.getElementById('asociacion-direccion').textContent = asociacion.direccion;
    
    // Actualizar estadísticas
    document.getElementById('asociacion-animales-rescatados').textContent = asociacion.animalesRescatados;
    document.getElementById('asociacion-donaciones-recibidas').textContent = asociacion.donacionesRecibidas;
    
    // Actualizar botón de donar
    document.getElementById('boton-donar').href = `donacion.html?asociacion=${asociacion.id}`;
}

function cargarMetas(asociacion) {
    const container = document.getElementById('asociacion-metas');
    
    container.innerHTML = `
        <div class="mb-4">
            <h6>Meta de Recaudación General</h6>
            <div class="progress mb-2" style="height: 20px;">
                <div class="progress-bar" style="width: ${asociacion.progreso}%"></div>
            </div>
            <div class="d-flex justify-content-between">
                <small>Recaudado: ₡${asociacion.recaudado.toLocaleString()}</small>
                <small>Meta: ₡${asociacion.meta.toLocaleString()}</small>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6">
                <div class="card border-0 bg-light">
                    <div class="card-body">
                        <h6>Próxima Meta: ${asociacion.necesidades[0]}</h6>
                        <div class="progress mb-2">
                            <div class="progress-bar bg-success" style="width: 65%"></div>
                        </div>
                        <small>₡195,000 de ₡300,000</small>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card border-0 bg-light">
                    <div class="card-body">
                        <h6>Meta Secundaria: ${asociacion.necesidades[1]}</h6>
                        <div class="progress mb-2">
                            <div class="progress-bar bg-info" style="width: 40%"></div>
                        </div>
                        <small>₡80,000 de ₡200,000</small>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function cargarAnimales(asociacion) {
    // Simular datos de animales rescatados
    const animales = [
        {
            nombre: 'Luna',
            especie: 'gato',
            imagen: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg',
            historia: 'Rescatada de la calle, ahora busca un hogar amoroso.',
            estado: 'Disponible para adopción'
        },
        {
            nombre: 'Max',
            especie: 'perro',
            imagen: 'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_1280.jpg',
            historia: 'Encontrado abandonado, muy juguetón y cariñoso.',
            estado: 'En tratamiento'
        },
        {
            nombre: 'Simba',
            especie: 'gato',
            imagen: 'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg',
            historia: 'Rescatado de un incendio, necesita cuidados especiales.',
            estado: 'Recuperación'
        },
        {
            nombre: 'Bella',
            especie: 'perro',
            imagen: 'https://cdn.pixabay.com/photo/2018/05/07/10/49/dog-3381130_1280.jpg',
            historia: 'Encontrada en mal estado, ahora completamente recuperada.',
            estado: 'Disponible para adopción'
        }
    ];

    const container = document.getElementById('asociacion-animales');
    container.innerHTML = '';

    animales.forEach(animal => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-3 mb-3';
        
        col.innerHTML = `
            <div class="card h-100">
                <img src="${animal.imagen}" class="card-img-top" alt="${animal.nombre}" style="height: 150px; object-fit: cover;">
                <div class="card-body">
                    <h6 class="card-title">${animal.nombre}</h6>
                    <p class="card-text small">${animal.historia}</p>
                    <span class="badge bg-${obtenerColorEstadoAnimal(animal.estado)}">${animal.estado}</span>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });
}

function cargarReportes(asociacion) {
    // Simular datos de reportes de transparencia
    const reportes = [
        { nombre: 'Reporte Mensual - Enero 2024', fecha: '2024-01-31' },
        { nombre: 'Reporte de Donaciones - Diciembre 2023', fecha: '2023-12-31' },
        { nombre: 'Memoria Anual 2023', fecha: '2023-12-31' },
        { nombre: 'Reporte de Gastos - Noviembre 2023', fecha: '2023-11-30' }
    ];

    const container = document.getElementById('asociacion-reportes');
    container.innerHTML = '';

    reportes.forEach(reporte => {
        const item = document.createElement('a');
        item.href = '#';
        item.className = 'list-group-item list-group-item-action';
        item.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1">${reporte.nombre}</h6>
                <small>${reporte.fecha}</small>
            </div>
            <p class="mb-1">Haz clic para descargar el reporte PDF</p>
        `;
        container.appendChild(item);
    });
}

function obtenerColorEstadoAnimal(estado) {
    const colores = {
        'Disponible para adopción': 'success',
        'En tratamiento': 'warning',
        'Recuperación': 'info',
        'Adoptado': 'primary'
    };
    return colores[estado] || 'secondary';
}

function contactarAsociacion() {
    const asociacionNombre = document.getElementById('asociacion-nombre').textContent;
    const email = document.getElementById('asociacion-email').textContent;
    const telefono = document.getElementById('asociacion-telefono').textContent;
    
    alert(`Contactar a ${asociacionNombre}\nEmail: ${email}\nTeléfono: ${telefono}\n\nEn una implementación real, se abriría un formulario de contacto.`);
}