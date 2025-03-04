// Función para formatear la fecha
function obtenerFechaFormateada() {
    const fecha = new Date();
    return fecha.toLocaleString('es-DO', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Función para actualizar loterías
function actualizarLoterias() {
    // Simulamos datos de lotería (en producción estos vendrían de una API)
    const resultados = {
        nacional: {
            numeros: Math.floor(Math.random() * 100).toString().padStart(2, '0') + ' - ' +
                    Math.floor(Math.random() * 100).toString().padStart(2, '0') + ' - ' +
                    Math.floor(Math.random() * 100).toString().padStart(2, '0'),
            ganamas: Math.floor(Math.random() * 100).toString().padStart(2, '0') + ' - ' +
                     Math.floor(Math.random() * 100).toString().padStart(2, '0') + ' - ' +
                     Math.floor(Math.random() * 100).toString().padStart(2, '0')
        },
        leidsa: {
            numeros: Math.floor(Math.random() * 100).toString().padStart(2, '0') + ' - ' +
                    Math.floor(Math.random() * 100).toString().padStart(2, '0') + ' - ' +
                    Math.floor(Math.random() * 100).toString().padStart(2, '0'),
            pega3: Math.floor(Math.random() * 100).toString().padStart(2, '0') + ' - ' +
                   Math.floor(Math.random() * 100).toString().padStart(2, '0') + ' - ' +
                   Math.floor(Math.random() * 100).toString().padStart(2, '0')
        }
    };

    // Actualizar elementos en la página
    if (document.getElementById('nacional-numeros')) {
        document.getElementById('nacional-numeros').textContent = resultados.nacional.numeros;
        document.getElementById('nacional-ganamas').textContent = resultados.nacional.ganamas;
    }
    if (document.getElementById('leidsa-numeros')) {
        document.getElementById('leidsa-numeros').textContent = resultados.leidsa.numeros;
        document.getElementById('leidsa-pega3').textContent = resultados.leidsa.pega3;
    }

    // Guardar en localStorage
    localStorage.setItem('ultimaActualizacionLoterias', obtenerFechaFormateada());
    localStorage.setItem('resultadosLoterias', JSON.stringify(resultados));
}

// Función para actualizar precio del dólar
function actualizarDolar() {
    // Simulamos datos del dólar (en producción estos vendrían de una API)
    const tasas = {
        compra: (56.75 + Math.random() * 0.5).toFixed(2),
        venta: (57.25 + Math.random() * 0.5).toFixed(2)
    };

    // Actualizar elementos en la página
    if (document.getElementById('tasa-compra')) {
        document.getElementById('tasa-compra').textContent = tasas.compra;
        document.getElementById('tasa-venta').textContent = tasas.venta;
        document.getElementById('ultima-actualizacion').textContent = 
            'Última actualización: ' + obtenerFechaFormateada();
    }

    // Guardar en localStorage
    localStorage.setItem('ultimaActualizacionDolar', obtenerFechaFormateada());
    localStorage.setItem('tasasDolar', JSON.stringify(tasas));
}

// Función para cargar datos guardados
function cargarDatosGuardados() {
    // Cargar datos de loterías
    const resultadosLoterias = localStorage.getItem('resultadosLoterias');
    if (resultadosLoterias) {
        const datos = JSON.parse(resultadosLoterias);
        if (document.getElementById('nacional-numeros')) {
            document.getElementById('nacional-numeros').textContent = datos.nacional.numeros;
            document.getElementById('nacional-ganamas').textContent = datos.nacional.ganamas;
        }
        if (document.getElementById('leidsa-numeros')) {
            document.getElementById('leidsa-numeros').textContent = datos.leidsa.numeros;
            document.getElementById('leidsa-pega3').textContent = datos.leidsa.pega3;
        }
    }

    // Cargar datos del dólar
    const tasasDolar = localStorage.getItem('tasasDolar');
    if (tasasDolar) {
        const datos = JSON.parse(tasasDolar);
        if (document.getElementById('tasa-compra')) {
            document.getElementById('tasa-compra').textContent = datos.compra;
            document.getElementById('tasa-venta').textContent = datos.venta;
        }
    }
}

// Iniciar actualizaciones cuando se cargue la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos guardados
    cargarDatosGuardados();

    // Actualizar datos
    actualizarLoterias();
    actualizarDolar();

    // Programar actualizaciones cada hora
    setInterval(actualizarLoterias, 1000 * 60 * 60);
    setInterval(actualizarDolar, 1000 * 60 * 60);
}); 