document.addEventListener('DOMContentLoaded', function() {
    const donationForm = document.getElementById('donationForm');
    const donationMessage = document.getElementById('donationMessage');

    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const amount = document.getElementById('amount').value;
        const donationType = document.querySelector('input[name="donationType"]:checked').value;
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const paymentMethod = document.getElementById('paymentMethod').value;
        const message = document.getElementById('message').value;
        const terms = document.getElementById('terms').checked;

        // Validaciones
        if (!terms) {
            mostrarMensajeDonacion('Debes aceptar los términos', 'danger');
            return;
        }

        // Simular datos del usuario (en producción vendría de la sesión)
        const userId = sessionStorage.getItem('userId') || 4; // Ejemplo: Daniel
        const asociacionId = 1; // Patitas Felices

        const data = {
            usuario_id: userId,
            asociacion_id: asociacionId,
            monto: amount,
            metodo_pago: paymentMethod
        };

        // Enviar al servidor
        fetch('php/realizar_donacion.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                mostrarMensajeDonacion('¡Donación registrada exitosamente! Número de transacción: ' + result.donacion_id, 'success');
                donationForm.reset();
                
                // Redirigir después de 3 segundos
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 3000);
            } else {
                mostrarMensajeDonacion(result.error || 'Error en la donación', 'danger');
            }
        })
        .catch(error => {
            mostrarMensajeDonacion('Error de conexión', 'danger');
        });
    });

    function mostrarMensajeDonacion(texto, tipo) {
        donationMessage.textContent = texto;
        donationMessage.className = `alert alert-${tipo} text-center py-2`;
        donationMessage.style.display = 'block';
    }
});