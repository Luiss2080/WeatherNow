// Formatear temperatura
export const formatearTemperatura = (temperatura) => {
  return `${Math.round(temperatura)}°C`;
};

// Formatear porcentaje
export const formatearPorcentaje = (valor) => {
  return `${Math.round(valor)}%`;
};

// Formatear velocidad del viento
export const formatearVelocidadViento = (velocidad) => {
  return `${Math.round(velocidad)} km/h`;
};

// Formatear presión
export const formatearPresion = (presion) => {
  return `${presion} hPa`;
};

// Formatear visibilidad
export const formatearVisibilidad = (visibilidad) => {
  return `${(visibilidad / 1000).toFixed(1)} km`;
};

// Formatear hora desde timestamp
export const formatearHora = (timestamp) => {
  const fecha = new Date(timestamp * 1000);
  return fecha.toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

// Formatear fecha completa
export const formatearFechaCompleta = (timestamp) => {
  const fecha = new Date(timestamp * 1000);
  return fecha.toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// Formatear fecha corta
export const formatearFechaCorta = (timestamp) => {
  const fecha = new Date(timestamp * 1000);
  return fecha.toLocaleDateString('es-ES', { 
    weekday: 'short', 
    day: 'numeric',
    month: 'short'
  });
};
