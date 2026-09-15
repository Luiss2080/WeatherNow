// Configuración de la API de OpenWeather.
// Los valores se leen de variables de entorno (ver .env.example).
// NOTA: import.meta.env.VITE_* se incluye en el bundle del cliente. Proteger la
// clave de verdad requiere el proxy de la spec 002.
export const API_CONFIG = {
  URL_BASE: import.meta.env.VITE_API_URL_BASE || 'https://api.openweathermap.org/data/2.5',
  API_KEY: import.meta.env.VITE_API_KEY || '',
  IDIOMA: import.meta.env.VITE_IDIOMA || 'es',
  UNIDADES: import.meta.env.VITE_UNIDADES || 'metric'
};

export const ENDPOINTS = {
  CLIMA_ACTUAL: '/weather',
  PRONOSTICO: '/forecast'
};
