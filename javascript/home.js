// home.js
document.addEventListener('DOMContentLoaded', function() {
    // Simulación de datos de asociaciones
    const asociaciones = [
        {
            nombre: "Refugio Patitas Felices",
            mision: "Rescate y rehabilitación de animales en situación de calle",
            necesidades: ["Alimento", "Medicinas", "Vacunas"],
            meta: 500000
        },
        {
            nombre: "Amigos de los Animales",
            mision: "Esterilización y adopción responsable",
            necesidades: ["Esterilizaciones", "Campanas de adopción"],
            meta: 300000
        }
    ];

    const container = document.getElementById('asociaciones-container');
    
    asociaciones.forEach(asoc => {
        const card = document.createElement('div');
        card.className = 'col-md-6 mb-4';
        card.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${asoc.nombre}</h5>
                    <p class="card-text">${asoc.mision}</p>
                    <h6>Necesidades:</h6>
                    <ul>
                        ${asoc.necesidades.map(need => `<li>${need}</li>`).join('')}
                    </ul>
                    <div class="progress mb-3">
                        <div class="progress-bar" style="width: 25%">25%</div>
                    </div>
                    <button class="btn btn-primary btn-donar" data-asociacion="${asoc.nombre}">
                        Donar Ahora
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    // Agregar funcionalidad a botones de donar
    document.querySelectorAll('.btn-donar').forEach(btn => {
        btn.addEventListener('click', function() {
            const asociacion = this.getAttribute('data-asociacion');
            alert(`Redirigiendo a donación para: ${asociacion}`);
            // Aquí iría la lógica para redirigir al módulo de donaciones
        });
    });
});