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
    coordenadas: {
      latitud: datosApi.coord?.lat || 0,
      longitud: datosApi.coord?.lon || 0
    }
  };
};

// Transformar datos del pronóstico
export const transformarDatosPronostico = (datosApi) => {
  if (!datosApi.list) return [];
  
  return datosApi.list.map(item => ({
    fecha: item.dt,
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

// Agrupar pronóstico por días
export const agruparPronosticoPorDias = (pronostico) => {
  const dias = {};
  
  pronostico.forEach(item => {
    const fecha = new Date(item.fecha * 1000);
    const diaClave = fecha.toDateString();
    
    if (!dias[diaClave]) {
      dias[diaClave] = [];
    }
    
    dias[diaClave].push(item);
  });
  
  return Object.entries(dias).map(([fecha, items]) => ({
    fecha: new Date(fecha),
    items: items,
    temperaturaMin: Math.min(...items.map(i => i.temperaturaMinima)),
    temperaturaMax: Math.max(...items.map(i => i.temperaturaMaxima)),
    humedadPromedio: items.reduce((sum, i) => sum + i.humedad, 0) / items.length
  }));
};
