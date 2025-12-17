
document.addEventListener('DOMContentLoaded', function() {
    // Obtener ID de la asociación desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const asociacionId = urlParams.get('id') || 1; // Default a ID 1 si no hay parámetro
    
    // Elementos de la página
    const btnDonar = document.querySelector('.btn-primary');
    const btnTransparencia = document.querySelector('.btn-outline-secondary');
    
    // Cargar datos de la asociación
    cargarDatosAsociacion(asociacionId);
    
    // Cargar campañas activas
    cargarCampaniasActivas(asociacionId);
    
    // Evento para botón de donar
    if (btnDonar) {
        btnDonar.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Guardar asociación seleccionada para la donación
            sessionStorage.setItem('asociacionDonacion', asociacionId);
            sessionStorage.setItem('asociacionNombre', document.querySelector('h1').textContent);
            
            // Redirigir a página de donación
            window.location.href = 'donacion.html';
        });
    }
    
    // Evento para botón de transparencia
    if (btnTransparencia) {
        btnTransparencia.addEventListener('click', function() {
            // Guardar filtro para página de transparencia
            sessionStorage.setItem('filtroAsociacionTransparencia', asociacionId);
        });
    }
    
    // Simular carga de datos relacionados
    simularCargaDatosRelacionados(asociacionId);
});

/**
 * Carga los datos de la asociación desde el servidor
 */
function cargarDatosAsociacion(asociacionId) {
    // En producción, esto haría un fetch al servidor
    console.log(`Cargando datos para asociación ID: ${asociacionId}`);
    
    // Simulación de datos (en producción vendría del backend)
    const asociaciones = {
        1: {
            nombre: "Refugio Patitas Felices",
            ubicacion: "San José, Costa Rica",
            contacto: "patitasfelices@ejemplo.org | +506 0000-0000",
            enfoque: "Rescate y adopción de perros y gatos",
            descripcion: "Refugio Patitas Felices se dedica al rescate de perros y gatos en situación de abandono o maltrato. Brindan atención veterinaria, alimentación, rehabilitación y buscan hogares responsables para cada animal rescatado.",
            infoExtra: "Actualmente mantienen en promedio entre 30 y 40 animales al cuidado del refugio.",
            anosOperacion: 5,
            animalesRescatadosAnual: 120
        },
        2: {
            nombre: "Fundación Huellitas",
            ubicacion: "Heredia, Costa Rica",
            contacto: "huellitas@ejemplo.org | +506 1111-1111",
            enfoque: "Esterilización y educación",
            descripcion: "Organizan campañas de esterilización a bajo costo y talleres educativos sobre tenencia responsable y bienestar animal.",
            infoExtra: "Han realizado más de 500 esterilizaciones en el último año.",
            anosOperacion: 3,
            animalesRescatadosAnual: 80
        },
        3: {
            nombre: "Proyecto Bigotes",
            ubicacion: "Cartago, Costa Rica",
            contacto: "bigotes@ejemplo.org | +506 2222-2222",
            enfoque: "Gatos ferales y colonias",
            descripcion: "Trabajan con colonias de gatos ferales mediante programas de captura, esterilización y retorno, además de rescate de casos especiales.",
            infoExtra: "Atienden 15 colonias felinas en la región.",
            anosOperacion: 4,
            animalesRescatadosAnual: 200
        }
    };
    
    const datos = asociaciones[asociacionId] || asociaciones[1];
    
    // Actualizar la página con los datos
    document.querySelector('h1').textContent = datos.nombre;
    
    const ubicacionElement = document.querySelector('main p:nth-of-type(1)');
    if (ubicacionElement) ubicacionElement.innerHTML = `<strong>Ubicación:</strong> ${datos.ubicacion}`;
    
    const enfoqueElement = document.querySelector('main p:nth-of-type(2)');
    if (enfoqueElement) enfoqueElement.innerHTML = `<strong>Enfoque:</strong> ${datos.enfoque}`;
    
    const contactoElement = document.querySelector('main p:nth-of-type(3)');
    if (contactoElement) contactoElement.innerHTML = `<strong>Contacto:</strong> ${datos.contacto}`;
    
    const descripcionElements = document.querySelectorAll('main p');
    if (descripcionElements[3]) descripcionElements[3].textContent = datos.descripcion;
    if (descripcionElements[4]) descripcionElements[4].textContent = datos.infoExtra;
    
    // Actualizar información rápida
    const listaInfo = document.querySelector('ul');
    if (listaInfo) {
        listaInfo.innerHTML = `
            <li>Tipo de organización: ONG</li>
            <li>Años de operación: ${datos.anosOperacion}</li>
            <li>Animales rescatados al año: ~${datos.animalesRescatadosAnual}</li>
            <li>Programas: rescate, adopción, esterilización, educación</li>
        `;
    }
}

/**
 * Carga las campañas activas de la asociación
 */
function cargarCampaniasActivas(asociacionId) {
    // Simulación de datos de campañas
    const campanias = {
        1: [
            {
                nombre: "Esterilizaciones 2024",
                meta: 500000,
                recaudado: 250000,
                descripcion: "Esta campaña busca financiar esterilizaciones para perros y gatos de comunidades con acceso limitado a servicios veterinarios."
            },
            {
                nombre: "Tratamiento para Luna",
                meta: 150000,
                recaudado: 80000,
                descripcion: "Luna es una perrita rescatada con problemas de cadera que requiere fisioterapia y medicamentos por varios meses."
            }
        ],
        2: [
            {
                nombre: "Campaña de Educación Escolar",
                meta: 300000,
                recaudado: 120000,
                descripcion: "Talleres educativos sobre tenencia responsable en escuelas de la comunidad."
            }
        ],
        3: [
            {
                nombre: "Alimentación para Colonias",
                meta: 200000,
                recaudado: 75000,
                descripcion: "Alimentación mensual para 15 colonias de gatos ferales."
            }
        ]
    };
    
    const campaniasActivas = campanias[asociacionId] || campanias[1];
    const campaniasContainer = document.querySelector('.card-body .mb-3');
    
    if (campaniasContainer && campaniasActivas.length > 0) {
        let campaniasHTML = '';
        
        campaniasActivas.forEach((campania, index) => {
            const porcentaje = Math.round((campania.recaudado / campania.meta) * 100);
            
            campaniasHTML += `
                <div class="mb-${index < campaniasActivas.length - 1 ? '3' : '0'}">
                    <h3 class="h6 mb-1">Campaña: ${campania.nombre}</h3>
                    <p class="mb-1">Meta: ₡${campania.meta.toLocaleString()} | Recaudado: ₡${campania.recaudado.toLocaleString()}</p>
                    <div class="progress mb-2">
                        <div class="progress-bar" role="progressbar" style="width: ${porcentaje}%">${porcentaje}%</div>
                    </div>
                    <p class="mb-0">${campania.descripcion}</p>
                </div>
                ${index < campaniasActivas.length - 1 ? '<hr>' : ''}
            `;
        });
        
        campaniasContainer.innerHTML = campaniasHTML;
    }
}

/**
 * Simula la carga de datos relacionados
 */
function simularCargaDatosRelacionados(asociacionId) {
    // Mostrar loading
    const cardBodies = document.querySelectorAll('.card-body');
    cardBodies.forEach(card => {
        card.classList.add('loading');
    });
    
    // Simular carga con timeout
    setTimeout(() => {
        cardBodies.forEach(card => {
            card.classList.remove('loading');
        });
        
        // Mostrar notificación de carga completa
        mostrarNotificacion('Datos cargados correctamente', 'success');
    }, 1000);
}

/**
 * Muestra una notificación en la página
 */
function mostrarNotificacion(mensaje, tipo = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${tipo} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alertDiv.style.zIndex = '1050';
    alertDiv.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

/**
 * Formatea números como moneda
 */
function formatearMoneda(monto) {
    return new Intl.NumberFormat('es-CR', {
        style: 'currency',
        currency: 'CRC'
    }).format(monto);
}

// Agregar estilos para estado de loading
const style = document.createElement('style');
style.textContent = `
    .loading {
        position: relative;
        opacity: 0.7;
    }
    
    .loading::after {
        content: 'Cargando...';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--primary-color);
        font-weight: bold;
    }
    
    .progress-bar {
        transition: width 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);