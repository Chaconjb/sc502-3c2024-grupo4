document.addEventListener('DOMContentLoaded', function() {
    const btnDonante = document.getElementById('btnDonante');
    const btnAsociacion = document.getElementById('btnAsociacion');
    const formDonante = document.getElementById('formDonante');
    const formAsociacion = document.getElementById('formAsociacion');
    const btnEnviarRegistro = document.getElementById('btnEnviarRegistro');
    const registroMensaje = document.getElementById('registroMensaje');

    let tipoRegistro = 'donante';

    btnDonante.addEventListener('click', function() {
        tipoRegistro = 'donante';
        btnDonante.classList.remove('btn-outline-primary');
        btnDonante.classList.add('btn-primary');
        btnAsociacion.classList.remove('btn-primary');
        btnAsociacion.classList.add('btn-outline-primary');
        formDonante.style.display = 'block';
        formAsociacion.style.display = 'none';
    });

    btnAsociacion.addEventListener('click', function() {
        tipoRegistro = 'asociacion';
        btnAsociacion.classList.remove('btn-outline-primary');
        btnAsociacion.classList.add('btn-primary');
        btnDonante.classList.remove('btn-primary');
        btnDonante.classList.add('btn-outline-primary');
        formAsociacion.style.display = 'block';
        formDonante.style.display = 'none';
    });

    btnEnviarRegistro.addEventListener('click', function() {
        if (tipoRegistro === 'donante') {
            registrarDonante();
        } else {
            registrarAsociacion();
        }
    });

    function registrarDonante() {
        const nombre = document.getElementById('donanteNombre').value;
        const email = document.getElementById('donanteCorreo').value;
        const telefono = document.getElementById('donanteTelefono').value;
        const provincia = document.getElementById('donanteProvincia').value;
        const password = document.getElementById('donantePassword').value;
        const password2 = document.getElementById('donantePassword2').value;
        const acepta = document.getElementById('donanteAcepta').checked;

        // Validaciones
        if (password !== password2) {
            mostrarMensaje('Las contraseñas no coinciden', 'danger');
            return;
        }
        if (!acepta) {
            mostrarMensaje('Debes aceptar los términos de uso', 'danger');
            return;
        }

        const data = {
            nombre: nombre,
            email: email,
            telefono: telefono,
            provincia: provincia,
            password: password
        };

        fetch('php/registro_donante.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                mostrarMensaje('¡Registro exitoso! Ahora puedes iniciar sesión.', 'success');
                formDonante.reset();
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 3000);
            } else {
                mostrarMensaje(result.error || 'Error en el registro', 'danger');
            }
        })
        .catch(error => {
            mostrarMensaje('Error de conexión: ' + error.message, 'danger');
        });
    }

    function registrarAsociacion() {
        const nombre = document.getElementById('asoNombre').value;
        const email = document.getElementById('asoCorreo').value;
        const telefono = document.getElementById('asoTelefono').value;
        const provincia = document.getElementById('asoProvincia').value;
        const descripcion = document.getElementById('asoDescripcion').value;
        const tipo = document.getElementById('asoTipo').value;
        const password = document.getElementById('asoPassword').value;
        const password2 = document.getElementById('asoPassword2').value;
        const acepta = document.getElementById('asoAcepta').checked;

        if (password !== password2) {
            mostrarMensaje('Las contraseñas no coinciden', 'danger');
            return;
        }
        if (!acepta) {
            mostrarMensaje('Debes confirmar que la información es verdadera', 'danger');
            return;
        }

        const data = {
            nombre_asociacion: nombre,
            email: email,
            telefono: telefono,
            provincia: provincia,
            descripcion: descripcion,
            tipo_organizacion: tipo,
            password: password
        };

        fetch('php/registro_asociacion.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                mostrarMensaje('¡Registro exitoso! Tu asociación está pendiente de aprobación.', 'success');
                formAsociacion.reset();
            } else {
                mostrarMensaje(result.error || 'Error en el registro', 'danger');
            }
        })
        .catch(error => {
            mostrarMensaje('Error de conexión: ' + error.message, 'danger');
        });
    }

    function mostrarMensaje(texto, tipo) {
        registroMensaje.textContent = texto;
        registroMensaje.className = `alert alert-${tipo} text-center py-2 mt-3`;
        registroMensaje.style.display = 'block';
        
        setTimeout(() => {
            registroMensaje.style.display = 'none';
        }, 5000);
    }
});