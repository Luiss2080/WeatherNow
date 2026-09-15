import clienteApi from './clienteApi';
import { ENDPOINTS } from '../constantes/configuracionApi';
import { CODIGOS_ERROR, MENSAJES_ERROR } from '../constantes/mensajes';

const CODIGOS_VALIDOS = new Set(Object.values(CODIGOS_ERROR));

const codigoPorEstado = (estado, hayRespuesta) => {
  if (estado === 404) return CODIGOS_ERROR.CIUDAD_NO_ENCONTRADA;
  if (estado === 401 || estado === 403) return CODIGOS_ERROR.CONFIGURACION;
  if (estado === 429) return CODIGOS_ERROR.LIMITE;
  if (!hayRespuesta) return CODIGOS_ERROR.RED;
  return CODIGOS_ERROR.DESCONOCIDO;
};

// Traduce un error de la petición a un error con `codigo` y mensaje legibles.
// Prioriza el código que envía el proxy; si no, lo deduce del estado HTTP.
export const traducirError = (error) => {
  if (error?.codigo) return error;

  const datos = error?.response?.data;
  const codigo = CODIGOS_VALIDOS.has(datos?.codigo)
    ? datos.codigo
    : codigoPorEstado(error?.response?.status, Boolean(error?.response));

  const traducido = new Error(datos?.mensaje || MENSAJES_ERROR[codigo]);
  traducido.codigo = codigo;
  return traducido;
};

const solicitar = async (endpoint, params, signal) => {
  try {
    const { data } = await clienteApi.get(endpoint, { params, signal });
    return data;
  } catch (error) {
    throw traducirError(error);
  }
};

// Obtener clima por ciudad
export const obtenerClimaPorCiudad = (nombreCiudad, signal) =>
  solicitar(ENDPOINTS.CLIMA_ACTUAL, { q: nombreCiudad }, signal);

// Obtener clima por coordenadas
export const obtenerClimaPorCoordenadas = (latitud, longitud, signal) =>
  solicitar(ENDPOINTS.CLIMA_ACTUAL, { lat: latitud, lon: longitud }, signal);

// Obtener pronóstico extendido por ciudad
export const obtenerPronostico = (nombreCiudad, signal) =>
  solicitar(ENDPOINTS.PRONOSTICO, { q: nombreCiudad }, signal);

// Obtener pronóstico extendido por coordenadas
export const obtenerPronosticoPorCoordenadas = (latitud, longitud, signal) =>
  solicitar(ENDPOINTS.PRONOSTICO, { lat: latitud, lon: longitud }, signal);
