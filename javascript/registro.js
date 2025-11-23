// registro.js
document.addEventListener('DOMContentLoaded', function() {
    // Funciones para mostrar/ocultar contraseñas
    function setupPasswordToggle(inputId, toggleButtonId) {
        const input = document.getElementById(inputId);
        const toggle = document.getElementById(toggleButtonId);
        
        if (input && toggle) {
            toggle.addEventListener('click', function() {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                
                const icon = this.querySelector('i');
                icon.classList.toggle('bi-eye');
                icon.classList.toggle('bi-eye-slash');
            });
        }
    }

    // Configurar los toggles de contraseña
    setupPasswordToggle('password', 'togglePassword');
    setupPasswordToggle('confirmPassword', 'toggleConfirmPassword');

    // Mostrar/ocultar campos adicionales para ONGs
    const tipoUsuario = document.getElementById('tipoUsuario');
    const camposONG = document.getElementById('camposONG');
    
    if (tipoUsuario && camposONG) {
        tipoUsuario.addEventListener('change', function() {
            if (this.value === 'ong') {
                camposONG.style.display = 'block';
            } else {
                camposONG.style.display = 'none';
            }
        });
    }

    // Manejar el envío del formulario
    const registroForm = document.getElementById('registroForm');
    const registroError = document.getElementById('registro-error');
    const registroSuccess = document.getElementById('registro-success');

    if (registroForm) {
        registroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const email = document.getElementById('email').value;
            const nombre = document.getElementById('nombre').value;
            const tipoUsuario = document.getElementById('tipoUsuario').value;
            const terminos = document.getElementById('terminos').checked;

            // Validaciones
            if (!terminos) {
                registroError.textContent = 'Debes aceptar los términos y condiciones';
                registroError.style.display = 'block';
                return;
            }

            if (password !== confirmPassword) {
                registroError.textContent = 'Las contraseñas no coinciden';
                registroError.style.display = 'block';
                return;
            }

            if (password.length < 6) {
                registroError.textContent = 'La contraseña debe tener al menos 6 caracteres';
                registroError.style.display = 'block';
                return;
            }

            // Crear objeto con los datos del formulario
            const formData = {
                id: Date.now(), // ID temporal
                nombre: nombre,
                email: email,
                password: password,
                tipoUsuario: tipoUsuario,
                fechaRegistro: new Date().toISOString()
            };

            // Si es ONG, agregar datos adicionales
            if (tipoUsuario === 'ong') {
                formData.nombreAsociacion = document.getElementById('nombreAsociacion').value;
                formData.telefono = document.getElementById('telefono').value;
                formData.descripcion = document.getElementById('descripcion').value;
            }

            // Guardar usuario en localStorage (simulación de base de datos)
            const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
            usuarios.push(formData);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            // Mostrar éxito y redirigir
            registroError.style.display = 'none';
            registroSuccess.style.display = 'block';
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }
    
    // Verificar si ya hay una sesión activa
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado && window.location.pathname.includes('registro.html')) {
        window.location.href = "home.html";
    }
});