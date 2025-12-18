// Configuración de la API de OpenWeather
export const API_CONFIG = {
  URL_BASE: 'https://api.openweathermap.org/data/2.5',
  API_KEY: 'TU_API_KEY_AQUI', // Reemplazar con tu API key de OpenWeather
  IDIOMA: 'es',
  UNIDADES: 'metric' // celsius, metric para km/h
};

export const ENDPOINTS = {
  CLIMA_ACTUAL: '/weather',
  PRONOSTICO: '/forecast',
  CLIMA_POR_CIUDAD: '/weather',
  CLIMA_POR_COORDENADAS: '/weather'
};
