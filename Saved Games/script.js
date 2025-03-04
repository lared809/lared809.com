// Función para obtener los datos de la lotería
async function fetchLotteryData() {
    try {
        // Usar un proxy CORS público
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const targetUrl = encodeURIComponent('https://www.conectate.com.do/loterias/');
        const response = await fetch(proxyUrl + targetUrl);
        const html = await response.text();
        
        // Crear un parser para el HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Función para extraer números
        const extractNumbers = (text) => {
            const numbers = text.match(/\d+/g);
            return numbers ? numbers.join(' ') : '';
        };

        // Actualizar Lotería Nacional
        const nacionalSection = doc.querySelector('.nacional');
        if (nacionalSection) {
            const nacionalNumbers = nacionalSection.querySelector('.winning-numbers')?.textContent || '';
            const juegaPegaNumbers = nacionalSection.querySelector('.juega-pega .winning-numbers')?.textContent || '';
            const ganaMasNumbers = nacionalSection.querySelector('.gana-mas .winning-numbers')?.textContent || '';

            document.querySelector('#nacional .winning-numbers:nth-child(2)').textContent = extractNumbers(nacionalNumbers);
            document.querySelector('#nacional .winning-numbers:nth-child(3)').textContent = `Juega+ Pega+: ${extractNumbers(juegaPegaNumbers)}`;
            document.querySelector('#nacional .winning-numbers:nth-child(4)').textContent = `Gana Más: ${extractNumbers(ganaMasNumbers)}`;
        }

        // Actualizar Leidsa
        const leidsaSection = doc.querySelector('.leidsa');
        if (leidsaSection) {
            const pega3MasNumbers = leidsaSection.querySelector('.pega-3-mas .winning-numbers')?.textContent || '';
            const lotoPoolNumbers = leidsaSection.querySelector('.loto-pool .winning-numbers')?.textContent || '';

            document.querySelector('#leidsa .winning-numbers:nth-child(2)').textContent = `Pega 3 Más: ${extractNumbers(pega3MasNumbers)}`;
            document.querySelector('#leidsa .winning-numbers:nth-child(3)').textContent = `Loto Pool: ${extractNumbers(lotoPoolNumbers)}`;
        }

        // Actualizar Lotería Real
        const realSection = doc.querySelector('.real');
        if (realSection) {
            const quinielaNumbers = realSection.querySelector('.quiniela .winning-numbers')?.textContent || '';
            const lotoPoolNumbers = realSection.querySelector('.loto-pool .winning-numbers')?.textContent || '';
            const lotoRealNumbers = realSection.querySelector('.loto-real .winning-numbers')?.textContent || '';

            document.querySelector('#real .winning-numbers:nth-child(2)').textContent = `Quiniela: ${extractNumbers(quinielaNumbers)}`;
            document.querySelector('#real .winning-numbers:nth-child(3)').textContent = `Loto Pool: ${extractNumbers(lotoPoolNumbers)}`;
            document.querySelector('#real .winning-numbers:nth-child(4)').textContent = `Loto Real: ${extractNumbers(lotoRealNumbers)}`;
        }

        // Actualizar fecha
        const today = new Date();
        const dateString = today.toLocaleDateString('es-DO', { day: '2-digit', month: '2-digit' });
        document.querySelector('.subtitle').textContent = `Últimos números ganadores actualizados al ${dateString}`;
        
        // Actualizar todas las fechas en las tarjetas
        document.querySelectorAll('.date').forEach(dateElement => {
            dateElement.textContent = `Fecha: ${dateString}`;
        });

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