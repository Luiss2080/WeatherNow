import { CODIGOS_ERROR, MENSAJES_ERROR } from '../src/constantes/mensajes.js';

const ESTADO_POR_CODIGO = {
  [CODIGOS_ERROR.CIUDAD_NO_ENCONTRADA]: 404,
  [CODIGOS_ERROR.CONFIGURACION]: 500,
  [CODIGOS_ERROR.LIMITE]: 429,
  [CODIGOS_ERROR.RED]: 502,
  [CODIGOS_ERROR.DESCONOCIDO]: 502
};

export const estadoParaCodigo = (codigo) =>
  ESTADO_POR_CODIGO[codigo] ?? ESTADO_POR_CODIGO[CODIGOS_ERROR.DESCONOCIDO];

export const crearErrorApi = (codigo) => {
  const error = new Error(MENSAJES_ERROR[codigo] || MENSAJES_ERROR[CODIGOS_ERROR.DESCONOCIDO]);
  error.codigo = codigo;
  return error;
};

export const cuerpoDeError = (codigo) => ({
  codigo,
  mensaje: MENSAJES_ERROR[codigo] || MENSAJES_ERROR[CODIGOS_ERROR.DESCONOCIDO]
});
