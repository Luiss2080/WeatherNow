import { CODIGOS_ERROR } from '../src/constantes/mensajes.js';
import { crearCache } from './cache.js';
import { crearLimitador } from './limite.js';
import { cuerpoDeError, estadoParaCodigo } from './errores.js';

const TIPO_POR_RUTA = {
  '/clima': 'clima',
  '/pronostico': 'pronostico'
};

// Valida y normaliza los parámetros de entrada (ciudad o coordenadas).
const normalizarParametros = (parametros) => {
  const ciudad = (parametros.q || '').trim();
  if (ciudad.length >= 2) return { q: ciudad };

  const lat = Number(parametros.lat);
  const lon = Number(parametros.lon);
  const coordenadasValidas =
    Number.isFinite(lat) && Number.isFinite(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180;
  if (coordenadasValidas) return { lat, lon };

  return null;
};

const cabecerasCuota = (cuota) => ({
  'X-RateLimit-Remaining': cuota.restantes,
  'X-RateLimit-Reset': cuota.reiniciaEn
});

// Núcleo del proxy: rate limit -> validación -> caché -> proveedor -> respuesta.
export const crearManejadorApi = ({
  configuracion,
  cliente,
  cache = crearCache(),
  limitador = crearLimitador(configuracion.limite)
}) => {
  const responder = (estado, cuerpo, cabeceras = {}) => ({ estado, cuerpo, cabeceras });

  const manejar = async ({ ruta, parametros = {}, clienteId = 'anonimo' }) => {
    const cuota = limitador.permitir(clienteId);
    if (!cuota.permitido) {
      return responder(429, cuerpoDeError(CODIGOS_ERROR.LIMITE), cabecerasCuota(cuota));
    }

    const tipo = TIPO_POR_RUTA[ruta];
    if (!tipo) {
      return responder(404, { codigo: 'NO_ENCONTRADO', mensaje: 'Recurso no encontrado' });
    }

    const parametrosNormalizados = normalizarParametros(parametros);
    if (!parametrosNormalizados) {
      return responder(400, {
        codigo: 'PARAMETROS',
        mensaje: 'Indica una ciudad o coordenadas válidas.'
      });
    }

    const claveCache = `${tipo}:${JSON.stringify(parametrosNormalizados)}`;
    const enCache = cache.obtener(claveCache);
    if (enCache.acertado) {
      return responder(200, enCache.valor, { 'X-Cache': 'HIT', ...cabecerasCuota(cuota) });
    }

    const ttl =
      tipo === 'clima' ? configuracion.cache.climaTtlMs : configuracion.cache.pronosticoTtlMs;

    try {
      const datos =
        tipo === 'clima'
          ? await cliente.clima(parametrosNormalizados)
          : await cliente.pronostico(parametrosNormalizados);
      cache.guardar(claveCache, datos, ttl);
      return responder(200, datos, { 'X-Cache': 'MISS', ...cabecerasCuota(cuota) });
    } catch (error) {
      const codigo = error?.codigo || CODIGOS_ERROR.DESCONOCIDO;
      return responder(estadoParaCodigo(codigo), cuerpoDeError(codigo), cabecerasCuota(cuota));
    }
  };

  return { manejar };
};
