/**
 * JavaScript para la página de landing (home.html)
 * Maneja animaciones, estadísticas y llamados a la acción
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está logueado
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const userName = sessionStorage.getItem('userName');
    
    // Personalizar mensaje si está logueado
    if (isLoggedIn && userName) {
        const heroTitle = document.querySelector('.display-5');
        if (heroTitle) {
            heroTitle.innerHTML = `¡Bienvenido de nuevo, ${userName}!<br>Sigue apoyando a quienes salvan vidas animales`;
        }
    }
    
    // Inicializar contadores animados
    inicializarContadores();
    
    // Configurar eventos para botones de llamada a la acción
    configurarEventosCTA();
    
    // Cargar estadísticas dinámicas
    cargarEstadisticas();
    
    // Configurar animaciones de scroll
    configurarAnimacionesScroll();
    
    // Configurar carrusel de testimonios (si existe)
    inicializarTestimonios();
});

/**
 * Inicializa contadores animados para estadísticas
 */
function inicializarContadores() {
    const counters = [
        { element: '#counterAsociaciones', target: 45, suffix: '+' },
        { element: '#counterAnimales', target: 1200, suffix: '+' },
        { element: '#counterDonaciones', target: 850, suffix: '+' }
    ];
    
    // Crear elementos de contador si no existen
    const statsSection = document.querySelector('.row.g-4');
    if (statsSection && !document.querySelector('#counterAsociaciones')) {
        statsSection.innerHTML += `
            <div class="col-md-4">
                <div class="card text-center shadow-sm border-0">
                    <div class="card-body">
                        <h3 class="h1 text-primary" id="counterAsociaciones">0</h3>
                        <p class="text-muted mb-0">Asociaciones registradas</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card text-center shadow-sm border-0">
                    <div class="card-body">
                        <h3 class="h1 text-primary" id="counterAnimales">0</h3>
                        <p class="text-muted mb-0">Animales ayudados</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card text-center shadow-sm border-0">
                    <div class="card-body">
                        <h3 class="h1 text-primary" id="counterDonaciones">0</h3>
                        <p class="text-muted mb-0">Donaciones realizadas</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Animar contadores cuando son visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    animateCounter(counter.element, counter.target, counter.suffix);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        observer.observe(statsSection);
    }
}

/**
 * Anima un contador desde 0 hasta el valor objetivo
 */
function animateCounter(elementId, target, suffix = '') {
    const element = document.querySelector(elementId);
    if (!element) return;
    
    let current = 0;
    const increment = target / 50; // Dividir en 50 pasos
    const duration = 2000; // 2 segundos
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, stepTime);
}

/**
 * Configura eventos para botones de llamada a la acción
 */
function configurarEventosCTA() {
    const btnVerAsociaciones = document.querySelector('a[href="asociaciones.html"]');
    const btnRegistrarse = document.querySelector('a[href="registro.html"]');
    const btnRegistrarAsociacion = document.querySelector('a.btn-primary.fw-semibold');
    
    // Añadir efectos hover y click a los botones
    [btnVerAsociaciones, btnRegistrarse, btnRegistrarAsociacion].forEach(btn => {
        if (btn) {
            // Efecto hover
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
            
            // Evento de clic con animación
            btn.addEventListener('click', function(e) {
                // Si es un enlace interno, añadir efecto de transición
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                
                // Animación de pulso
                this.style.animation = 'pulse 0.3s';
                setTimeout(() => {
                    this.style.animation = '';
                }, 300);
            });
        }
    });
}

/**
 * Carga estadísticas dinámicas desde el servidor (simulado)
 */
function cargarEstadisticas() {
    // En producción, esto haría fetch al backend
    fetch('php/obtener_estadisticas.php')
        .then(response => response.json())
        .then(data => {
            // Actualizar UI con datos reales
            console.log('Estadísticas cargadas:', data);
        })
        .catch(error => {
            console.log('Usando estadísticas de demostración');
            // Usar datos de demostración
        });
}

/**
 * Configura animaciones al hacer scroll
 */
function configurarAnimacionesScroll() {
    const animatedElements = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Inicializa carrusel de testimonios (si se agrega a la página)
 */
function inicializarTestimonios() {
    // Crear sección de testimonios si no existe
    const mainElement = document.querySelector('main');
    if (mainElement && !document.querySelector('#testimonios')) {
        const testimoniosHTML = `
            <section id="testimonios" class="my-5">
                <h2 class="h4 text-white text-center mb-4">Lo que dicen nuestros donantes</h2>
                <div class="row g-4">
                    <div class="col-md-6">
                        <div class="card shadow-sm h-100">
                            <div class="card-body">
                                <div class="d-flex align-items-center mb-3">
                                    <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                                        <span class="fw-bold">M</span>
                                    </div>
                                    <div class="ms-3">
                                        <h5 class="mb-0">María Rodríguez</h5>
                                        <small class="text-muted">Donante desde 2023</small>
                                    </div>
                                </div>
                                <p class="mb-0">"Gracias a ConnectaPet puedo ver exactamente cómo se usa mi donación. ¡Total transparencia!"</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card shadow-sm h-100">
                            <div class="card-body">
                                <div class="d-flex align-items-center mb-3">
                                    <div class="rounded-circle bg-success text-white d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                                        <span class="fw-bold">C</span>
                                    </div>
                                    <div class="ms-3">
                                        <h5 class="mb-0">Carlos Méndez</h5>
                                        <small class="text-muted">Voluntario y donante</small>
                                    </div>
                                </div>
                                <p class="mb-0">"La plataforma ha ayudado a nuestra asociación a recibir más apoyo y ser más visibles."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
        
        // Insertar antes del footer
        const footer = document.querySelector('footer');
        mainElement.insertBefore(createElementFromHTML(testimoniosHTML), footer);
    }
}

/**
 * Crea un elemento DOM desde HTML string
 */
function createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

/**
 * Muestra notificación de bienvenida
 */
function mostrarNotificacionBienvenida() {
    if (!sessionStorage.getItem('welcomeShown')) {
        setTimeout(() => {
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-info alert-dismissible fade show position-fixed bottom-0 end-0 m-3';
            alertDiv.style.zIndex = '1050';
            alertDiv.style.maxWidth = '300px';
            alertDiv.innerHTML = `
                <strong>¡Bienvenido a ConnectaPet!</strong><br>
                Conecta con asociaciones y ayuda a animales necesitados.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            
            document.body.appendChild(alertDiv);
            
            sessionStorage.setItem('welcomeShown', 'true');
            
            // Auto-eliminar después de 10 segundos
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.remove();
                }
            }, 10000);
        }, 1000);
    }
}

// Llamar a la función de notificación
document.addEventListener('DOMContentLoaded', mostrarNotificacionBienvenida);

// Agregar estilos CSS para animaciones
const landingStyles = document.createElement('style');
landingStyles.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .card {
        transition: all 0.3s ease;
    }
    
    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15) !important;
    }
    
    /* Animaciones para contadores */
    .counter-animated {
        animation: countUp 2s ease-out;
    }
    
    @keyframes countUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(landingStyles);