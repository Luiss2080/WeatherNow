// Configuración del cliente. A partir de la spec 002 todas las llamadas pasan
// por el proxy (/api), que es quien posee la clave del proveedor.
export const API_CONFIG = {
  URL_BASE: '/api'
};

export const ENDPOINTS = {
  CLIMA_ACTUAL: '/clima',
  PRONOSTICO: '/pronostico',
  AIRE: '/aire'
};
