import clienteApi from './clienteApi';
import { ENDPOINTS } from '../constantes/configuracionApi';

// Obtener clima por ciudad
export const obtenerClimaPorCiudad = async (nombreCiudad) => {
  try {
    const response = await clienteApi.get(ENDPOINTS.CLIMA_POR_CIUDAD, {
      params: { q: nombreCiudad }
    });
    return response.data;
  } catch (error) {
    throw new Error('No se pudo obtener el clima de la ciudad');
  }
};

// Obtener clima por coordenadas
export const obtenerClimaPorCoordenadas = async (latitud, longitud) => {
  try {
    const response = await clienteApi.get(ENDPOINTS.CLIMA_POR_COORDENADAS, {
      params: { lat: latitud, lon: longitud }
    });
    return response.data;
  } catch (error) {
    throw new Error('No se pudo obtener el clima por coordenadas');
  }
};

// Obtener pronóstico extendido
export const obtenerPronostico = async (nombreCiudad) => {
  try {
    const response = await clienteApi.get(ENDPOINTS.PRONOSTICO, {
      params: { q: nombreCiudad }
    });
    return response.data;
  } catch (error) {
    throw new Error('No se pudo obtener el pronóstico');
  }
};

// Obtener pronóstico por coordenadas
export const obtenerPronosticoPorCoordenadas = async (latitud, longitud) => {
  try {
    const response = await clienteApi.get(ENDPOINTS.PRONOSTICO, {
      params: { lat: latitud, lon: longitud }
    });
    return response.data;
  } catch (error) {
    throw new Error('No se pudo obtener el pronóstico');
  }
};
