// home.js
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está logueado
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    
    if (!usuarioLogueado) {
        window.location.href = "login.html";
        return;
    }
    
    const usuario = JSON.parse(usuarioLogueado);
    
    // Actualizar interfaz según el tipo de usuario
    actualizarInterfazUsuario(usuario);
    
    // Cargar datos del dashboard
    cargarDashboard(usuario);
    
    // Configurar logout
    document.getElementById('logout-btn').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('usuarioLogueado');
        window.location.href = "index.html";
    });
    
    function actualizarInterfazUsuario(usuario) {
        // Actualizar nombre de usuario
        document.getElementById('user-name').textContent = usuario.nombre;
        document.getElementById('welcome-message').textContent = `Bienvenido, ${usuario.nombre}`;
        
        // Mostrar/ocultar elementos según el tipo de usuario
        if (usuario.tipo === 'ong') {
            document.getElementById('panel-ong-link').style.display = 'block';
            document.getElementById('estadisticas-ong-section').style.display = 'block';
            document.getElementById('ultimas-donaciones-section').style.display = 'none';
        } else if (usuario.tipo === 'donante') {
            document.getElementById('ultimas-donaciones-section').style.display = 'block';
            document.getElementById('estadisticas-ong-section').style.display = 'none';
        } else {
            document.getElementById('ultimas-donaciones-section').style.display = 'none';
            document.getElementById('estadisticas-ong-section').style.display = 'none';
        }
    }
    
    function cargarDashboard(usuario) {
        // Cargar asociaciones destacadas
        cargarAsociacionesDestacadas();
        
        // Cargar estadísticas según el tipo de usuario
        if (usuario.tipo === 'donante') {
            cargarEstadisticasDonante(usuario.id);
            cargarUltimasDonaciones(usuario.id);
        } else if (usuario.tipo === 'ong') {
            cargarEstadisticasONG(usuario.id);
        }
    }
    
    function cargarAsociacionesDestacadas() {
        const asociacionesDestacadas = [
            {
                id: 1,
                nombre: "Refugio Patitas Felices",
                descripcion: "Rescate y rehabilitación de animales en situación de calle",
                imagen: "https://cdn.pixabay.com/photo/2016/02/19/15/46/dog-1210559_1280.jpg",
                necesidades: ["Alimento", "Medicinas", "Vacunas"],
                progreso: 25,
                meta: 500000,
                recaudado: 125000
            },
            {
                id: 2,
                nombre: "Amigos de los Animales",
                descripcion: "Esterilización y adopción responsable",
                imagen: "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg",
                necesidades: ["Esterilizaciones", "Campañas de adopción"],
                progreso: 60,
                meta: 300000,
                recaudado: 180000
            },
            {
                id: 3,
                nombre: "Salvando Huellitas",
                descripcion: "Atención veterinaria para animales en estado crítico",
                imagen: "https://cdn.pixabay.com/photo/2015/11/17/13/13/dog-1047518_1280.jpg",
                necesidades: ["Cirugías", "Tratamientos", "Hospitalización"],
                progreso: 40,
                meta: 750000,
                recaudado: 300000
            }
        ];
        
        const container = document.getElementById('asociaciones-destacadas');
        container.innerHTML = '';
        
        asociacionesDestacadas.forEach(asoc => {
            const col = document.createElement('div');
            col.className = 'col-md-4';
            
            col.innerHTML = `
                <div class="card association-card h-100 shadow-sm">
                    <img src="${asoc.imagen}" class="card-img-top" alt="${asoc.nombre}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${asoc.nombre}</h5>
                        <p class="card-text flex-grow-1">${asoc.descripcion}</p>
                        <h6 class="mt-2">Necesidades:</h6>
                        <ul class="mb-3">
                            ${asoc.necesidades.map(need => `<li>${need}</li>`).join('')}
                        </ul>
                        <div class="mb-2">
                            <small class="text-muted">Progreso: ${asoc.progreso}% (₡${asoc.recaudado.toLocaleString()} de ₡${asoc.meta.toLocaleString()})</small>
                            <div class="progress">
                                <div class="progress-bar" style="width: ${asoc.progreso}%"></div>
                            </div>
                        </div>
                        <div class="d-grid gap-2">
                            <a href="asociacion-detalle.html?id=${asoc.id}" class="btn btn-outline-primary">Ver Detalles</a>
                            <a href="donacion.html?asociacion=${asoc.id}" class="btn btn-primary">Donar Ahora</a>
                        </div>
                    </div>
                </div>
            `;
            
            container.appendChild(col);
        });
    }
    
    function cargarEstadisticasDonante(usuarioId) {
        // Simular datos de estadísticas
        const totalDonado = 125000;
        const asociacionesAyudadas = 3;
        const totalDonaciones = 5;
        const impactoGenerado = 8; // animales ayudados
        
        document.getElementById('total-donado').textContent = `₡${totalDonado.toLocaleString()}`;
        document.getElementById('asociaciones-ayudadas').textContent = asociacionesAyudadas;
        document.getElementById('total-donaciones').textContent = totalDonaciones;
        document.getElementById('impacto-generado').textContent = impactoGenerado;
    }
    
    function cargarUltimasDonaciones(usuarioId) {
        // Simular datos de donaciones
        const donaciones = [
            { id: 1, asociacion: "Refugio Patitas Felices", fecha: "2024-01-15", monto: 25000, estado: "Completada" },
            { id: 2, asociacion: "Amigos de los Animales", fecha: "2024-01-10", monto: 15000, estado: "Completada" },
            { id: 3, asociacion: "Salvando Huellitas", fecha: "2024-01-05", monto: 35000, estado: "Completada" }
        ];
        
        const tabla = document.getElementById('tabla-donaciones');
        tabla.innerHTML = '';
        
        donaciones.forEach(donacion => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${donacion.asociacion}</td>
                <td>${donacion.fecha}</td>
                <td>₡${donacion.monto.toLocaleString()}</td>
                <td><span class="badge bg-success">${donacion.estado}</span></td>
                <td>
                    <a href="transparencia.html?donacion=${donacion.id}" class="btn btn-sm btn-outline-primary">Ver Detalle</a>
                </td>
            `;
            tabla.appendChild(fila);
        });
    }
    
    function cargarEstadisticasONG(usuarioId) {
        // Configurar gráficos para ONG
        const donacionesCtx = document.getElementById('donacionesChart').getContext('2d');
        const fondosCtx = document.getElementById('fondosChart').getContext('2d');
        
        // Gráfico de donaciones (simulado)
        new Chart(donacionesCtx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Donaciones Mensuales',
                    data: [12000, 19000, 15000, 25000, 22000, 30000],
                    borderColor: '#4e73df',
                    backgroundColor: 'rgba(78, 115, 223, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
        
      
        
        // Actualizar estadísticas
        document.getElementById('total-donado').textContent = '₡123,000';
        document.getElementById('asociaciones-ayudadas').textContent = '1';
        document.getElementById('total-donaciones').textContent = '24';
        document.getElementById('impacto-generado').textContent = '45';
    }
});