// API Local para Loterías
class LoteriasAPI {
    constructor() {
        this.resultados = {
            nacional: {
                nombre: "Lotería Nacional",
                ultimoSorteo: [],
                ganaMas: [],
                hora: "14:30",
                status: "PENDIENTE"
            },
            leidsa: {
                nombre: "Leidsa",
                ultimoSorteo: [],
                pega3Mas: [],
                hora: "20:55",
                status: "PENDIENTE"
            },
            real: {
                nombre: "Lotería Real",
                ultimoSorteo: [],
                lotoPool: [],
                hora: "12:55",
                status: "PENDIENTE"
            },
            loteka: {
                nombre: "Loteka",
                quiniela: [],
                megaChances: [],
                hora: "19:55",
                status: "PENDIENTE"
            }
        };

        // Horarios de sorteos
        this.horarios = {
            nacional: ["14:30", "21:00"],
            leidsa: ["20:55"],
            real: ["12:55"],
            loteka: ["19:55"],
            primera: ["12:30", "20:00"],
            suerte: ["12:30", "18:00"],
            lotedom: ["14:00"],
            newyork: ["14:30", "22:30"],
            king: ["10:00", "15:00", "20:00"],
            anguila: ["11:00", "15:30"],
            florida: ["13:30", "19:30"],
            american: ["16:00", "21:00"],
            loto5: ["20:30"]
        };
    }

    // Generar números aleatorios
    generarNumeros(cantidad = 3) {
        return Array.from({length: cantidad}, () => 
            Math.floor(Math.random() * 100).toString().padStart(2, '0')
        );
    }

    // Verificar si es hora de sorteo
    esHoraSorteo(loteria) {
        const ahora = new Date();
        const hora = ahora.getHours();
        const minutos = ahora.getMinutes();
        const horaActual = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
        
        return this.horarios[loteria]?.includes(horaActual) || false;
    }

    // Actualizar resultados
    actualizarResultados(loteria) {
        if (!this.resultados[loteria]) return null;

        const esHoraSorteo = this.esHoraSorteo(loteria);
        const resultado = this.resultados[loteria];

        if (esHoraSorteo) {
            resultado.status = "EN PROCESO";
            switch(loteria) {
                case 'nacional':
                    resultado.ultimoSorteo = this.generarNumeros(3);
                    resultado.ganaMas = this.generarNumeros(3);
                    break;
                case 'leidsa':
                    resultado.ultimoSorteo = this.generarNumeros(3);
                    resultado.pega3Mas = this.generarNumeros(3);
                    break;
                case 'real':
                    resultado.ultimoSorteo = this.generarNumeros(3);
                    resultado.lotoPool = this.generarNumeros(4);
                    break;
                case 'loteka':
                    resultado.quiniela = this.generarNumeros(3);
                    resultado.megaChances = this.generarNumeros(5);
                    break;
            }
        } else {
            resultado.status = "PENDIENTE";
        }

        return resultado;
    }

    // Obtener resultados de una lotería
    obtenerResultados(loteria) {
        return this.actualizarResultados(loteria);
    }

    // Obtener todos los resultados
    obtenerTodosLosResultados() {
        const resultados = {};
        for (const loteria in this.resultados) {
            resultados[loteria] = this.actualizarResultados(loteria);
        }
        return resultados;
    }
}

// Exportar la API
const loteriaAPI = new LoteriasAPI(); 