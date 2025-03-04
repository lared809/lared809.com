const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS
app.use(cors());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Función para extraer números
function extractNumbers(text) {
    const numbers = text.match(/\d+/g);
    return numbers ? numbers.join(' ') : '';
}

// Ruta para obtener los datos de la lotería
app.get('/api/lottery-data', async (req, res) => {
    try {
        const response = await axios.get('https://www.conectate.com.do/loterias/');
        const $ = cheerio.load(response.data);
        
        const lotteryData = {
            nacional: {
                numbers: extractNumbers($('.nacional .winning-numbers').text()),
                juegaPega: extractNumbers($('.juega-pega .winning-numbers').text()),
                ganaMas: extractNumbers($('.gana-mas .winning-numbers').text())
            },
            leidsa: {
                pega3Mas: extractNumbers($('.leidsa .pega-3-mas .winning-numbers').text()),
                lotoPool: extractNumbers($('.leidsa .loto-pool .winning-numbers').text())
            },
            real: {
                quiniela: extractNumbers($('.real .quiniela .winning-numbers').text()),
                lotoPool: extractNumbers($('.real .loto-pool .winning-numbers').text()),
                lotoReal: extractNumbers($('.real .loto-real .winning-numbers').text())
            },
            // ... más loterías según sea necesario
        };

        res.json(lotteryData);
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).json({ error: 'Error al obtener los datos de la lotería' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 