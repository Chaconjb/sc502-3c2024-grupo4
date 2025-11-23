// login.js
document.addEventListener('DOMContentLoaded', function() {
    // Manejar el toggle de visibilidad de la contraseña
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');
    
    if (togglePassword && password) {
        togglePassword.addEventListener('click', function() {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            
            // Cambiar el ícono del ojo
            const icon = this.querySelector('i');
            icon.classList.toggle('bi-eye');
            icon.classList.toggle('bi-eye-slash');
        });
    }

    // Manejar el envío del formulario
    const loginForm = document.querySelector('#loginform');
    const loginError = document.querySelector('#login-error');
    
    // Usuarios de prueba para desarrollo
    const usuariosPrueba = [
        { 
            id: 1, 
            email: "admin@connectapet.com", 
            password: "admin123", 
            nombre: "Administrador",
            tipo: "admin" 
        },
        { 
            id: 2, 
            email: "ong@ejemplo.com", 
            password: "ong123", 
            nombre: "Refugio Patitas Felices",
            tipo: "ong" 
        },
        { 
            id: 3, 
            email: "donante@ejemplo.com", 
            password: "donante123", 
            nombre: "Carlos Méndez",
            tipo: "donante" 
        },
        { 
            id: 4, 
            email: "voluntario@ejemplo.com", 
            password: "voluntario123", 
            nombre: "Ana López",
            tipo: "voluntario" 
        }
    ];
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            
            // Verificar credenciales
            const usuario = usuariosPrueba.find(u => u.email === email && u.password === password);
            
            if (usuario) {
                // Guardar información del usuario en localStorage
                localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
                
                // Redirigir al dashboard
                window.location.href = "home.html";
            } else {
                // Mostrar error
                loginError.style.display = 'block';
            }
        });
    }
    
    // Verificar si ya hay una sesión activa
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado && window.location.pathname.includes('login.html')) {
        window.location.href = "home.html";
    }
});