addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    // Obtener los datos de la lotería
    const lotteryData = await fetchLotteryData();
    
    // Si la solicitud es para la API
    if (request.url.includes('/api/lottery-data')) {
      return new Response(JSON.stringify(lotteryData), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      });
    }
    
    // Si es una solicitud para la página principal
    const html = await fetch('https://lared809.com/index.html');
    return new Response(html.body, {
      headers: { 'Content-Type': 'text/html' },
      status: 200
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al obtener los datos' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
}

async function fetchLotteryData() {
  try {
    const response = await fetch('https://www.conectate.com.do/loterias/');
    const html = await response.text();
    
    // Crear un parser para el HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Función para extraer números
    const extractNumbers = (text) => {
      const numbers = text.match(/\d+/g);
      return numbers ? numbers.join(' ') : '';
    };

    // Extraer datos de la Lotería Nacional
    const nacionalSection = doc.querySelector('.nacional');
    const nacional = {
      numbers: extractNumbers(nacionalSection?.querySelector('.winning-numbers')?.textContent || ''),
      juegaPega: extractNumbers(nacionalSection?.querySelector('.juega-pega .winning-numbers')?.textContent || ''),
      ganaMas: extractNumbers(nacionalSection?.querySelector('.gana-mas .winning-numbers')?.textContent || '')
    };

    // Extraer datos de Leidsa
    const leidsaSection = doc.querySelector('.leidsa');
    const leidsa = {
      pega3Mas: extractNumbers(leidsaSection?.querySelector('.pega-3-mas .winning-numbers')?.textContent || ''),
      lotoPool: extractNumbers(leidsaSection?.querySelector('.loto-pool .winning-numbers')?.textContent || '')
    };

    // Extraer datos de Lotería Real
    const realSection = doc.querySelector('.real');
    const real = {
      quiniela: extractNumbers(realSection?.querySelector('.quiniela .winning-numbers')?.textContent || ''),
      lotoPool: extractNumbers(realSection?.querySelector('.loto-pool .winning-numbers')?.textContent || ''),
      lotoReal: extractNumbers(realSection?.querySelector('.loto-real .winning-numbers')?.textContent || '')
    };

    return {
      nacional,
      leidsa,
      real,
      fecha: new Date().toLocaleDateString('es-DO', { day: '2-digit', month: '2-digit' })
    };

  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
} 