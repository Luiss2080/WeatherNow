import { describe, it, expect, vi } from 'vitest';
import { crearManejadorApi } from '../api/proxy.js';
import { crearCache } from '../api/cache.js';
import { crearLimitador } from '../api/limite.js';
import { crearErrorApi } from '../api/errores.js';
import { CODIGOS_ERROR } from '../src/constantes/mensajes.js';

const crearConfiguracionPrueba = () => ({
  proveedor: {},
  cache: { climaTtlMs: 600000, pronosticoTtlMs: 1800000 },
  limite: { maximo: 100, ventanaMs: 600000 }
});

const crearManejador = (cliente, extra = {}) =>
  crearManejadorApi({
    configuracion: crearConfiguracionPrueba(),
    cliente,
    cache: crearCache({ ahora: extra.ahora }),
    limitador: crearLimitador({ maximo: 100, ventanaMs: 600000, ahora: extra.ahora })
  });

describe('crearManejadorApi', () => {
  it('responde el clima y lo cachea', async () => {
    const clima = { name: 'Madrid' };
    const cliente = { clima: vi.fn().mockResolvedValue(clima), pronostico: vi.fn() };
    const manejador = crearManejador(cliente);

    const primera = await manejador.manejar({ ruta: '/clima', parametros: { q: 'Madrid' } });
    const segunda = await manejador.manejar({ ruta: '/clima', parametros: { q: 'Madrid' } });

    expect(primera.estado).toBe(200);
    expect(primera.cabeceras['X-Cache']).toBe('MISS');
    expect(segunda.cabeceras['X-Cache']).toBe('HIT');
    expect(cliente.clima).toHaveBeenCalledTimes(1);
  });

  it('rechaza parámetros inválidos con 400', async () => {
    const manejador = crearManejador({ clima: vi.fn(), pronostico: vi.fn() });

    const resultado = await manejador.manejar({ ruta: '/clima', parametros: { q: 'M' } });

    expect(resultado.estado).toBe(400);
  });

  it('devuelve 404 en una ruta desconocida', async () => {
    const manejador = crearManejador({ clima: vi.fn(), pronostico: vi.fn() });

    const resultado = await manejador.manejar({ ruta: '/desconocido', parametros: { q: 'Madrid' } });

    expect(resultado.estado).toBe(404);
  });

  it('traduce un error del proveedor a su estado y código', async () => {
    const cliente = {
      clima: vi.fn().mockRejectedValue(crearErrorApi(CODIGOS_ERROR.CIUDAD_NO_ENCONTRADA)),
      pronostico: vi.fn()
    };
    const manejador = crearManejador(cliente);

    const resultado = await manejador.manejar({ ruta: '/clima', parametros: { q: 'Narnia' } });

    expect(resultado.estado).toBe(404);
    expect(resultado.cuerpo.codigo).toBe(CODIGOS_ERROR.CIUDAD_NO_ENCONTRADA);
  });

  it('aplica el límite de peticiones', async () => {
    const cliente = { clima: vi.fn().mockResolvedValue({}), pronostico: vi.fn() };
    const manejador = crearManejadorApi({
      configuracion: crearConfiguracionPrueba(),
      cliente,
      cache: crearCache(),
      limitador: crearLimitador({ maximo: 1, ventanaMs: 600000, ahora: () => 0 })
    });

    const primera = await manejador.manejar({
      ruta: '/clima',
      parametros: { q: 'Madrid' },
      clienteId: 'ip'
    });
    const segunda = await manejador.manejar({
      ruta: '/clima',
      parametros: { q: 'Madrid' },
      clienteId: 'ip'
    });

    expect(primera.estado).toBe(200);
    expect(segunda.estado).toBe(429);
  });
});
