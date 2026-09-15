const SEGUNDOS_A_MS = 1000;

const esNumeroValido = (valor) => typeof valor === 'number' && !Number.isNaN(valor);

// Desplaza un timestamp UTC al huso horario de una ciudad (offset en segundos).
const aFechaLocal = (timestamp, offsetSegundos = 0) =>
  new Date((timestamp + offsetSegundos) * SEGUNDOS_A_MS);

// Formatear temperatura
export const formatearTemperatura = (temperatura) => {
  if (!esNumeroValido(temperatura)) return '--°C';
  return `${Math.round(temperatura)}°C`;
};

// Formatear porcentaje
export const formatearPorcentaje = (valor) => {
  if (!esNumeroValido(valor)) return '--%';
  return `${Math.round(valor)}%`;
};

// Formatear velocidad del viento
export const formatearVelocidadViento = (velocidad) => {
  if (!esNumeroValido(velocidad)) return '-- km/h';
  return `${Math.round(velocidad)} km/h`;
};

// Formatear presión
export const formatearPresion = (presion) => {
  if (!esNumeroValido(presion)) return '-- hPa';
  return `${presion} hPa`;
};

// Formatear visibilidad
export const formatearVisibilidad = (visibilidad) => {
  if (!esNumeroValido(visibilidad)) return '-- km';
  return `${(visibilidad / 1000).toFixed(1)} km`;
};

// Formatear hora (timestamp UTC) en el huso de la ciudad
export const formatearHora = (timestamp, offsetSegundos = 0) => {
  return aFechaLocal(timestamp, offsetSegundos).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  });
};

// Formatear fecha completa en el huso de la ciudad
export const formatearFechaCompleta = (timestamp, offsetSegundos = 0) => {
  return aFechaLocal(timestamp, offsetSegundos).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });
};

// Formatear fecha corta en el huso de la ciudad
export const formatearFechaCorta = (timestamp, offsetSegundos = 0) => {
  return aFechaLocal(timestamp, offsetSegundos).toLocaleDateString('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC'
  });
};

// Clave de día (YYYY-MM-DD) en el huso de la ciudad
export const claveDia = (timestamp, offsetSegundos = 0) =>
  aFechaLocal(timestamp, offsetSegundos).toISOString().slice(0, 10);
