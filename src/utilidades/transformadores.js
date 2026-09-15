import { claveDia } from './formateadores';

// Transformar datos de la API al formato de la aplicación
export const transformarDatosClima = (datosApi) => {
  return {
    ciudad: datosApi.name,
    pais: datosApi.sys?.country || '',
    temperatura: datosApi.main?.temp || 0,
    sensacionTermica: datosApi.main?.feels_like || 0,
    temperaturaMinima: datosApi.main?.temp_min || 0,
    temperaturaMaxima: datosApi.main?.temp_max || 0,
    humedad: datosApi.main?.humidity || 0,
    presion: datosApi.main?.pressure || 0,
    velocidadViento: datosApi.wind?.speed || 0,
    direccionViento: datosApi.wind?.deg || 0,
    visibilidad: datosApi.visibility || 0,
    descripcion: datosApi.weather?.[0]?.description || '',
    icono: datosApi.weather?.[0]?.icon || '01d',
    amanecer: datosApi.sys?.sunrise || 0,
    atardecer: datosApi.sys?.sunset || 0,
    timestamp: datosApi.dt || 0,
    zonaHoraria: datosApi.timezone || 0,
    coordenadas: {
      latitud: datosApi.coord?.lat || 0,
      longitud: datosApi.coord?.lon || 0
    }
  };
};

// Transformar datos del pronóstico. Cada franja lleva el huso de su ciudad.
export const transformarDatosPronostico = (datosApi) => {
  if (!datosApi.list) return [];

  const zonaHoraria = datosApi.city?.timezone || 0;

  return datosApi.list.map((item) => ({
    fecha: item.dt,
    zonaHoraria,
    temperatura: item.main?.temp || 0,
    temperaturaMinima: item.main?.temp_min || 0,
    temperaturaMaxima: item.main?.temp_max || 0,
    humedad: item.main?.humidity || 0,
    descripcion: item.weather?.[0]?.description || '',
    icono: item.weather?.[0]?.icon || '01d',
    velocidadViento: item.wind?.speed || 0,
    probabilidadLluvia: item.pop ? item.pop * 100 : 0
  }));
};

// Agrupar pronóstico por días según el huso de la ciudad (no el del dispositivo)
export const agruparPronosticoPorDias = (pronostico) => {
  const dias = new Map();

  pronostico.forEach((item) => {
    const clave = claveDia(item.fecha, item.zonaHoraria || 0);
    if (!dias.has(clave)) dias.set(clave, []);
    dias.get(clave).push(item);
  });

  return [...dias.values()].map((items) => ({
    diaClave: claveDia(items[0].fecha, items[0].zonaHoraria || 0),
    fecha: items[0].fecha,
    zonaHoraria: items[0].zonaHoraria || 0,
    items,
    temperaturaMin: Math.min(...items.map((i) => i.temperaturaMinima)),
    temperaturaMax: Math.max(...items.map((i) => i.temperaturaMaxima)),
    humedadPromedio: items.reduce((sum, i) => sum + i.humedad, 0) / items.length
  }));
};
