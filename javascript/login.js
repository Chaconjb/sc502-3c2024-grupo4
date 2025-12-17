document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validación básica
        if (!username || !password) {
            showError('Por favor completa todos los campos');
            return;
        }

        // Enviar datos al servidor
        fetch('php/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Guardar datos de sesión
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userId', data.user_id);
                sessionStorage.setItem('userType', data.user_type);
                sessionStorage.setItem('userName', data.user_name);
                
                // Redirigir según tipo de usuario
                if (data.user_type === 'Asociado' || data.user_type === 'Admin_Interno') {
                    window.location.href = 'dashboard.html';
                } else {
                    window.location.href = 'home.html';
                }
            } else {
                showError(data.error || 'Credenciales incorrectas');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showError('Error de conexión con el servidor');
        });
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }
});