import { CODIGOS_ERROR } from '../src/constantes/mensajes.js';
import { crearCache } from './cache.js';
import { crearLimitador } from './limite.js';
import { crearMetricas } from './metricas.js';
import { cuerpoDeError, estadoParaCodigo } from './errores.js';

// Rutas del proxy. `soloCoordenadas` obliga a usar lat/lon (el aire no admite q).
const RUTAS = {
  '/clima': {
    tipo: 'clima',
    proveedor: 'openweather',
    soloCoordenadas: false,
    ejecutar: (cliente, parametros) => cliente.clima(parametros)
  },
  '/pronostico': {
    tipo: 'pronostico',
    proveedor: 'openweather',
    soloCoordenadas: false,
    ejecutar: (cliente, parametros) => cliente.pronostico(parametros)
  },
  '/aire': {
    tipo: 'aire',
    proveedor: 'openmeteo',
    soloCoordenadas: true,
    ejecutar: (cliente, parametros) => cliente.aire(parametros)
  }
};

const normalizarCoordenadas = (parametros) => {
  const lat = Number(parametros.lat);
  const lon = Number(parametros.lon);
  const validas =
    Number.isFinite(lat) && Number.isFinite(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180;
  return validas ? { lat, lon } : null;
};

// Valida y normaliza los parámetros de entrada (ciudad o coordenadas).
const normalizarParametros = (parametros, { soloCoordenadas }) => {
  if (soloCoordenadas) return normalizarCoordenadas(parametros);
  const ciudad = (parametros.q || '').trim();
  if (ciudad.length >= 2) return { q: ciudad };
  return normalizarCoordenadas(parametros);
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
  limitador = crearLimitador(configuracion.limite),
  metricas = crearMetricas()
}) => {
  const responder = (estado, cuerpo, cabeceras = {}) => ({ estado, cuerpo, cabeceras });

  const ttlPorTipo = {
    clima: configuracion.cache.climaTtlMs,
    pronostico: configuracion.cache.pronosticoTtlMs,
    aire: configuracion.cache.aireTtlMs
  };

  const manejar = async ({ ruta, parametros = {}, clienteId = 'anonimo' }) => {
    const cuota = limitador.permitir(clienteId);
    if (!cuota.permitido) {
      return responder(429, cuerpoDeError(CODIGOS_ERROR.LIMITE), cabecerasCuota(cuota));
    }

    if (ruta === '/metricas') {
      return responder(200, metricas.resumen());
    }

    const definicion = RUTAS[ruta];
    if (!definicion) {
      return responder(404, { codigo: 'NO_ENCONTRADO', mensaje: 'Recurso no encontrado' });
    }

    const { tipo, proveedor } = definicion;
    metricas.registrarPeticion(tipo, proveedor);

    const parametrosNormalizados = normalizarParametros(parametros, definicion);
    if (!parametrosNormalizados) {
      return responder(400, {
        codigo: 'PARAMETROS',
        mensaje: 'Indica una ciudad o coordenadas válidas.'
      });
    }

    const claveCache = `${tipo}:${JSON.stringify(parametrosNormalizados)}`;
    const enCache = cache.obtener(claveCache);
    if (enCache.acertado) {
      metricas.registrarAcierto(tipo, proveedor);
      return responder(200, enCache.valor, { 'X-Cache': 'HIT', ...cabecerasCuota(cuota) });
    }

    metricas.registrarFallo(tipo, proveedor);

    try {
      const datos = await definicion.ejecutar(cliente, parametrosNormalizados);
      cache.guardar(claveCache, datos, ttlPorTipo[tipo]);
      return responder(200, datos, { 'X-Cache': 'MISS', ...cabecerasCuota(cuota) });
    } catch (error) {
      metricas.registrarError(tipo, proveedor);
      const codigo = error?.codigo || CODIGOS_ERROR.DESCONOCIDO;
      return responder(estadoParaCodigo(codigo), cuerpoDeError(codigo), cabecerasCuota(cuota));
    }
  };

  return { manejar };
};
