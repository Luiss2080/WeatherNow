import clienteApi from './clienteApi';
import { API_CONFIG, ENDPOINTS } from '../constantes/configuracionApi';
import { CODIGOS_ERROR, MENSAJES_ERROR } from '../constantes/mensajes';

// Traduce un error de axios a un error con `codigo` y mensaje legibles.
export const traducirError = (error) => {
  if (error?.codigo) return error;

  const estado = error?.response?.status;
  let codigo = CODIGOS_ERROR.DESCONOCIDO;

  if (estado === 404) codigo = CODIGOS_ERROR.CIUDAD_NO_ENCONTRADA;
  else if (estado === 401 || estado === 403) codigo = CODIGOS_ERROR.CONFIGURACION;
  else if (estado === 429) codigo = CODIGOS_ERROR.LIMITE;
  else if (!error?.response) codigo = CODIGOS_ERROR.RED;

  const traducido = new Error(MENSAJES_ERROR[codigo]);
  traducido.codigo = codigo;
  return traducido;
};

const crearErrorConfiguracion = () => {
  const error = new Error(MENSAJES_ERROR[CODIGOS_ERROR.CONFIGURACION]);
  error.codigo = CODIGOS_ERROR.CONFIGURACION;
  return error;
};

const hayApiKey = () => Boolean(API_CONFIG.API_KEY && API_CONFIG.API_KEY !== 'TU_API_KEY_AQUI');

const solicitar = async (endpoint, params, signal) => {
  if (!hayApiKey()) throw crearErrorConfiguracion();

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
