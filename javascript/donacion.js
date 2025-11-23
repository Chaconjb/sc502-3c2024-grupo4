// donacion.js
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

        // Si el usuario está logueado, prellenar información
        document.getElementById('donante-nombre').value = usuario.nombre;
        document.getElementById('donante-email').value = usuario.email;
    }

    // Cargar asociaciones para donación
    cargarAsociacionesDonacion();

    // Configurar event listeners
    document.getElementById('monto-fijo').addEventListener('change', actualizarMonto);
    document.getElementById('monto-personalizado').addEventListener('input', actualizarMontoPersonalizado);
});

let asociacionSeleccionada = null;
let montoSeleccionado = 0;

function cargarAsociacionesDonacion() {
    // Simular datos de asociaciones (los mismos que en asociaciones.js)
    const asociaciones = [
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

    const container = document.getElementById('lista-asociaciones-donacion');
    
    asociaciones.forEach(asoc => {
        const col = document.createElement('div');
        col.className = 'col-md-6';
        
        col.innerHTML = `
            <div class="card h-100 association-card" onclick="seleccionarAsociacion(${asoc.id})">
                <img src="${asoc.imagen}" class="card-img-top" alt="${asoc.nombre}" style="height: 150px; object-fit: cover;">
                <div class="card-body">
                    <h6 class="card-title">${asoc.nombre}</h6>
                    <p class="card-text small">${asoc.descripcion}</p>
                    <div class="progress mb-2">
                        <div class="progress-bar" style="width: ${asoc.progreso}%"></div>
                    </div>
                    <small class="text-muted">${asoc.progreso}% completado</small>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });
}

function seleccionarAsociacion(id) {
    // Remover selección anterior
    document.querySelectorAll('.association-card').forEach(card => {
        card.classList.remove('border-primary', 'border-3');
    });

    // Agregar selección actual
    event.currentTarget.classList.add('border-primary', 'border-3');
    
    // Guardar asociación seleccionada
    const asociaciones = [
        { id: 1, nombre: "Refugio Patitas Felices" },
        { id: 2, nombre: "Amigos de los Animales" },
        { id: 3, nombre: "Salvando Huellitas" }
    ];
    
    asociacionSeleccionada = asociaciones.find(asoc => asoc.id === id);
}

function siguientePaso(paso) {
    // Validaciones antes de avanzar
    if (paso === 2 && !asociacionSeleccionada) {
        alert('Por favor, selecciona una asociación para continuar.');
        return;
    }

    if (paso === 3 && montoSeleccionado === 0) {
        alert('Por favor, selecciona un monto para continuar.');
        return;
    }

    if (paso === 4) {
        // Validar información personal
        const nombre = document.getElementById('donante-nombre').value;
        const email = document.getElementById('donante-email').value;

        if (!nombre || !email) {
            alert('Por favor, completa toda la información requerida.');
            return;
        }

        // Actualizar resumen
        actualizarResumen();
    }

    // Cambiar al siguiente paso
    document.querySelectorAll('.nav-pills .nav-link').forEach((link, index) => {
        if (index === paso - 1) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    document.querySelectorAll('.tab-pane').forEach((pane, index) => {
        if (index === paso - 1) {
            pane.classList.add('show', 'active');
        } else {
            pane.classList.remove('show', 'active');
        }
    });
}

function actualizarMonto() {
    const montoFijo = document.getElementById('monto-fijo');
    const montoPersonalizado = document.getElementById('monto-personalizado');
    
    montoSeleccionado = parseInt(montoFijo.value);
    montoPersonalizado.value = '';
}

function actualizarMontoPersonalizado() {
    const montoPersonalizado = document.getElementById('monto-personalizado');
    const montoFijo = document.getElementById('monto-fijo');
    
    if (montoPersonalizado.value) {
        montoSeleccionado = parseInt(montoPersonalizado.value);
        montoFijo.value = '';
    }
}

function actualizarResumen() {
    document.getElementById('resumen-asociacion').textContent = asociacionSeleccionada ? asociacionSeleccionada.nombre : '-';
    document.getElementById('resumen-monto').textContent = `₡${montoSeleccionado.toLocaleString()}`;
    document.getElementById('resumen-donante').textContent = document.getElementById('donante-nombre').value;
    document.getElementById('resumen-email').textContent = document.getElementById('donante-email').value;
}

function procesarDonacion() {
    const confirmarTerminos = document.getElementById('confirmar-terminos').checked;

    if (!confirmarTerminos) {
        alert('Debes aceptar los términos y condiciones para continuar.');
        return;
    }

    if (!asociacionSeleccionada || montoSeleccionado === 0) {
        alert('Error en la información de la donación.');
        return;
    }

    // Simular procesamiento de donación
    const donacion = {
        id: Date.now(),
        asociacion: asociacionSeleccionada.nombre,
        asociacionId: asociacionSeleccionada.id,
        monto: montoSeleccionado,
        donante: document.getElementById('donante-nombre').value,
        email: document.getElementById('donante-email').value,
        telefono: document.getElementById('donante-telefono').value,
        mensaje: document.getElementById('donante-mensaje').value,
        fecha: new Date().toISOString(),
        estado: 'completada'
    };

    // Guardar en localStorage (simulación)
    const donaciones = JSON.parse(localStorage.getItem('donaciones') || '[]');
    donaciones.push(donacion);
    localStorage.setItem('donaciones', JSON.stringify(donaciones));

    // Mostrar confirmación
    alert(`¡Donación exitosa! Has donado ₡${montoSeleccionado.toLocaleString()} a ${asociacionSeleccionada.nombre}.`);
    
    // Redirigir a la página de transparencia o home
    window.location.href = 'transparencia.html';
}