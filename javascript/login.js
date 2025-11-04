document.addEventListener('DOMContentLoaded', function() {
    // Manejar el toggle de visibilidad de la contraseña
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');
    
    togglePassword.addEventListener('click', function() {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        
        // Cambiar el ícono del ojo
        const icon = this.querySelector('i');
        icon.classList.toggle('bi-eye');
        icon.classList.toggle('bi-eye-slash');
    });

    // Manejar el envío del formulario
    const loginForm = document.querySelector('#loginform');
    const loginError = document.querySelector('#login-error');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        
        // Aquí puedes agregar la lógica de validación que necesites
        if (email && password) {
            // Por ahora solo mostramos el mensaje de error como demo
            loginError.style.display = 'block';
        }
    });
});