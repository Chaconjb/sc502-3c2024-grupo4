document.addEventListener('DOMContentLoaded', function() {
    // Funciones para mostrar/ocultar contraseñas
    function setupPasswordToggle(inputId, toggleButtonId) {
        const input = document.getElementById(inputId);
        const toggle = document.getElementById(toggleButtonId);
        
        toggle.addEventListener('click', function() {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            icon.classList.toggle('bi-eye');
            icon.classList.toggle('bi-eye-slash');
        });
    }

    // Configurar los toggles de contraseña
    setupPasswordToggle('password', 'togglePassword');
    setupPasswordToggle('confirmPassword', 'toggleConfirmPassword');

    // Manejar el envío del formulario
    const registroForm = document.getElementById('registroForm');
    const registroError = document.getElementById('registro-error');

    registroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const email = document.getElementById('email').value;
        const nombre = document.getElementById('nombre').value;
        const tipoUsuario = document.getElementById('tipoUsuario').value;

        // Validaciones
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

        // Aquí puedes agregar más validaciones si lo deseas

        // Crear objeto con los datos del formulario
        const formData = {
            nombre: nombre,
            email: email,
            password: password,
            tipoUsuario: tipoUsuario
        };

        // Aquí puedes agregar la lógica para enviar los datos al servidor
        console.log('Datos del registro:', formData);
        
        // Por ahora solo mostraremos un mensaje de éxito
        alert('Registro exitoso!');
        window.location.href = 'index.html';
    });
});