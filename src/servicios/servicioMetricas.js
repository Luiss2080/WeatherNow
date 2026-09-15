import clienteApi from './clienteApi';
import { traducirError } from './servicioClima';

// Resumen de uso del proxy (contadores internos).
export const obtenerMetricas = async (signal) => {
  try {
    const { data } = await clienteApi.get('/metricas', { signal });
    return data;
  } catch (error) {
    throw traducirError(error);
  }
};
