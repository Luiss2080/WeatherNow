import { describe, it, expect, vi } from 'vitest';
import { crearMetricas } from '../api/metricas.js';
import { crearManejadorApi } from '../api/proxy.js';
import { crearCache } from '../api/cache.js';
import { crearLimitador } from '../api/limite.js';

describe('crearMetricas', () => {
  it('cuenta peticiones, caché y errores por tipo', () => {
    const metricas = crearMetricas({ ahora: () => 1000 });

    metricas.registrarPeticion('clima', 'openweather');
    metricas.registrarAcierto('clima', 'openweather');
    metricas.registrarFallo('clima', 'openweather');
    metricas.registrarError('aire', 'openmeteo');

    const resumen = metricas.resumen();
    expect(resumen.iniciadoEn).toBe(1000);
    expect(resumen.porTipo.clima).toMatchObject({
      proveedor: 'openweather',
      peticiones: 1,
      aciertosCache: 1,
      fallosCache: 1
    });
    expect(resumen.porTipo.aire.errores).toBe(1);
  });
});

describe('métricas en el proxy', () => {
  const configuracion = {
    proveedor: {},
    cache: { climaTtlMs: 600000, pronosticoTtlMs: 1800000, aireTtlMs: 1800000 },
    limite: { maximo: 100, ventanaMs: 600000 }
  };

  it('registra peticiones y aciertos de caché, y expone /metricas', async () => {
    const cliente = { clima: vi.fn().mockResolvedValue({ name: 'Madrid' }) };
    const manejador = crearManejadorApi({
      configuracion,
      cliente,
      cache: crearCache(),
      limitador: crearLimitador({ maximo: 100, ventanaMs: 600000 })
    });

    await manejador.manejar({ ruta: '/clima', parametros: { q: 'Madrid' } });
    await manejador.manejar({ ruta: '/clima', parametros: { q: 'Madrid' } });

    const respuesta = await manejador.manejar({ ruta: '/metricas', parametros: {} });

    expect(respuesta.estado).toBe(200);
    expect(respuesta.cuerpo.porTipo.clima).toMatchObject({
      peticiones: 2,
      aciertosCache: 1,
      fallosCache: 1
    });
  });
});
