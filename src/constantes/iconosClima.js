// Mapeo de códigos de clima a iconos y descripciones
export const ICONOS_CLIMA = {
  '01d': { icono: '☀️', descripcion: 'Despejado' },
  '01n': { icono: '🌙', descripcion: 'Despejado' },
  '02d': { icono: '⛅', descripcion: 'Parcialmente nublado' },
  '02n': { icono: '☁️', descripcion: 'Parcialmente nublado' },
  '03d': { icono: '☁️', descripcion: 'Nublado' },
  '03n': { icono: '☁️', descripcion: 'Nublado' },
  '04d': { icono: '☁️', descripcion: 'Muy nublado' },
  '04n': { icono: '☁️', descripcion: 'Muy nublado' },
  '09d': { icono: '🌧️', descripcion: 'Lluvia' },
  '09n': { icono: '🌧️', descripcion: 'Lluvia' },
  '10d': { icono: '🌦️', descripcion: 'Lluvia ligera' },
  '10n': { icono: '🌧️', descripcion: 'Lluvia ligera' },
  '11d': { icono: '⛈️', descripcion: 'Tormenta' },
  '11n': { icono: '⛈️', descripcion: 'Tormenta' },
  '13d': { icono: '❄️', descripcion: 'Nieve' },
  '13n': { icono: '❄️', descripcion: 'Nieve' },
  '50d': { icono: '🌫️', descripcion: 'Neblina' },
  '50n': { icono: '🌫️', descripcion: 'Neblina' }
};

export const obtenerIconoClima = (codigoIcono) => {
  return ICONOS_CLIMA[codigoIcono] || { icono: '🌡️', descripcion: 'Desconocido' };
};
