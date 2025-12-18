
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('donationForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Detiene el envío normal para usar AJAX

        // Capturamos los datos manualmente por ID
        const datos = new FormData();
        datos.append('amount', document.getElementById('amount').value);
        datos.append('fullName', document.getElementById('fullName').value);
        datos.append('email', document.getElementById('email').value);
        datos.append('paymentMethod', document.getElementById('paymentMethod').value);
        
        const tipoSeleccionado = document.querySelector('input[name="donationType"]:checked');
        datos.append('donationType', tipoSeleccionado ? tipoSeleccionado.value : 'general');

        try {
            // Enviamos al PHP
            const respuesta = await fetch('php/realizar_donacion.php', {
                method: 'POST',
                body: datos
            });

            const resultado = await respuesta.json();

            if (resultado.status === 'success') {
                document.getElementById('donationMessage').style.display = 'block';
                form.reset();
                alert("¡Donación realizada con éxito!");
            } else {
                alert("Error: " + resultado.message);
            }
        } catch (error) {
            console.error("Error detallado:", error);
            alert("No se pudo conectar con el servidor PHP. Revisa la consola (F12).");
        }
    });
});