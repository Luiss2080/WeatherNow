import clienteApi from './clienteApi';
import { traducirError } from './servicioClima';
import { ENDPOINTS } from '../constantes/configuracionApi';

// Obtener calidad del aire, UV y polen del proxy (Open-Meteo).
export const obtenerAire = async (latitud, longitud, signal) => {
  try {
    const { data } = await clienteApi.get(ENDPOINTS.AIRE, {
      params: { lat: latitud, lon: longitud },
      signal
    });
    return data;
  } catch (error) {
    throw traducirError(error);
  }
};
