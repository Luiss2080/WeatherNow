// Configuración del proxy (spec 002). Las claves viven solo en el servidor.
const MINUTO_MS = 60 * 1000;

export const crearConfiguracion = (entorno = {}) => ({
  proveedor: {
    urlBase: entorno.OPENWEATHER_URL_BASE || 'https://api.openweathermap.org/data/2.5',
    apiKey: entorno.OPENWEATHER_API_KEY || '',
    idioma: entorno.OPENWEATHER_IDIOMA || 'es',
    unidades: entorno.OPENWEATHER_UNIDADES || 'metric'
  },
  cache: {
    climaTtlMs: Number(entorno.API_CLIMA_TTL_MS || 10 * MINUTO_MS),
    pronosticoTtlMs: Number(entorno.API_PRONOSTICO_TTL_MS || 30 * MINUTO_MS)
  },
  limite: {
    maximo: Number(entorno.API_MAX_PETICIONES || 60),
    ventanaMs: Number(entorno.API_VENTANA_MS || 10 * MINUTO_MS)
  }
});
