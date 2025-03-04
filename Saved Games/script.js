// Función para obtener los datos de la lotería
async function fetchLotteryData() {
    try {
        const response = await fetch('/api/lottery-data');
        const data = await response.json();
        
        // Actualizar Lotería Nacional
        if (data.nacional) {
            document.querySelector('#nacional .winning-numbers:nth-child(2)').textContent = data.nacional.numbers;
            document.querySelector('#nacional .winning-numbers:nth-child(3)').textContent = `Juega+ Pega+: ${data.nacional.juegaPega}`;
            document.querySelector('#nacional .winning-numbers:nth-child(4)').textContent = `Gana Más: ${data.nacional.ganaMas}`;
        }

        // Actualizar Leidsa
        if (data.leidsa) {
            document.querySelector('#leidsa .winning-numbers:nth-child(2)').textContent = `Pega 3 Más: ${data.leidsa.pega3Mas}`;
            document.querySelector('#leidsa .winning-numbers:nth-child(3)').textContent = `Loto Pool: ${data.leidsa.lotoPool}`;
        }

        // Actualizar Lotería Real
        if (data.real) {
            document.querySelector('#real .winning-numbers:nth-child(2)').textContent = `Quiniela: ${data.real.quiniela}`;
            document.querySelector('#real .winning-numbers:nth-child(3)').textContent = `Loto Pool: ${data.real.lotoPool}`;
            document.querySelector('#real .winning-numbers:nth-child(4)').textContent = `Loto Real: ${data.real.lotoReal}`;
        }

        // Actualizar fecha
        if (data.fecha) {
            document.querySelector('.subtitle').textContent = `Últimos números ganadores actualizados al ${data.fecha}`;
            
            // Actualizar todas las fechas en las tarjetas
            document.querySelectorAll('.date').forEach(dateElement => {
                dateElement.textContent = `Fecha: ${data.fecha}`;
            });
        }

    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

// Función para actualizar automáticamente
function startAutoUpdate() {
    // Actualizar inmediatamente al cargar
    fetchLotteryData();
    
    // Actualizar cada 5 minutos
    setInterval(fetchLotteryData, 5 * 60 * 1000);
}

// Iniciar la actualización automática cuando el documento esté listo
document.addEventListener('DOMContentLoaded', startAutoUpdate); 