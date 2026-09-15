// Colores para diferentes condiciones climáticas
export const COLORES_TEMPERATURA = {
  muyFrio: '#3b82f6', // azul
  frio: '#60a5fa', // azul claro
  templado: '#fbbf24', // amarillo
  calido: '#f59e0b', // naranja
  muyCalido: '#ef4444' // rojo
};

export const obtenerColorTemperatura = (temperatura) => {
  if (temperatura < 10) return COLORES_TEMPERATURA.muyFrio;
  if (temperatura < 18) return COLORES_TEMPERATURA.frio;
  if (temperatura < 25) return COLORES_TEMPERATURA.templado;
  if (temperatura < 32) return COLORES_TEMPERATURA.calido;
  return COLORES_TEMPERATURA.muyCalido;
};

export const COLORES_HUMEDAD = {
  baja: '#fbbf24',
  media: '#60a5fa',
  alta: '#3b82f6'
};

export const obtenerColorHumedad = (humedad) => {
  if (humedad < 40) return COLORES_HUMEDAD.baja;
  if (humedad < 70) return COLORES_HUMEDAD.media;
  return COLORES_HUMEDAD.alta;
};
