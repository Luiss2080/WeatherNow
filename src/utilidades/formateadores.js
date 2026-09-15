const SEGUNDOS_A_MS = 1000;

export const UNIDADES = {
  METRICO: 'metric',
  IMPERIAL: 'imperial'
};

const esImperial = (unidades) => unidades === UNIDADES.IMPERIAL;
const unidadTemperatura = (unidades) => (esImperial(unidades) ? 'F' : 'C');
const unidadVelocidad = (unidades) => (esImperial(unidades) ? 'mph' : 'km/h');
const unidadDistancia = (unidades) => (esImperial(unidades) ? 'mi' : 'km');

const esNumeroValido = (valor) => typeof valor === 'number' && !Number.isNaN(valor);

export const convertirTemperatura = (celsius, unidades) =>
  esImperial(unidades) ? (celsius * 9) / 5 + 32 : celsius;

export const convertirVelocidad = (kmh, unidades) => (esImperial(unidades) ? kmh * 0.621371 : kmh);

export const convertirDistancia = (km, unidades) => (esImperial(unidades) ? km * 0.621371 : km);

// Desplaza un timestamp UTC al huso horario de una ciudad (offset en segundos).
const aFechaLocal = (timestamp, offsetSegundos = 0) =>
  new Date((timestamp + offsetSegundos) * SEGUNDOS_A_MS);

// Formatear temperatura
export const formatearTemperatura = (temperatura, unidades = UNIDADES.METRICO) => {
  if (!esNumeroValido(temperatura)) return `--°${unidadTemperatura(unidades)}`;
  return `${Math.round(convertirTemperatura(temperatura, unidades))}°${unidadTemperatura(unidades)}`;
};

// Formatear porcentaje
export const formatearPorcentaje = (valor) => {
  if (!esNumeroValido(valor)) return '--%';
  return `${Math.round(valor)}%`;
};

// Formatear velocidad del viento
export const formatearVelocidadViento = (velocidad, unidades = UNIDADES.METRICO) => {
  if (!esNumeroValido(velocidad)) return `-- ${unidadVelocidad(unidades)}`;
  return `${Math.round(convertirVelocidad(velocidad, unidades))} ${unidadVelocidad(unidades)}`;
};

// Formatear presión
export const formatearPresion = (presion) => {
  if (!esNumeroValido(presion)) return '-- hPa';
  return `${presion} hPa`;
};

// Formatear visibilidad
export const formatearVisibilidad = (visibilidad, unidades = UNIDADES.METRICO) => {
  if (!esNumeroValido(visibilidad)) return `-- ${unidadDistancia(unidades)}`;
  const km = visibilidad / 1000;
  return `${convertirDistancia(km, unidades).toFixed(1)} ${unidadDistancia(unidades)}`;
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
