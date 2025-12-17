// Verificar si el usuario está logueado
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userName = sessionStorage.getItem('userName');
    
    if (isLoggedIn && userName) {
        // Actualizar la UI para mostrar nombre de usuario
        console.log(`Bienvenido de nuevo, ${userName}`);
    }
});