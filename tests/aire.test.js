import { describe, it, expect, vi } from 'vitest';
import { normalizarAire } from '../api/proveedores/openmeteo.js';
import { crearManejadorApi } from '../api/proxy.js';
import { crearCache } from '../api/cache.js';
import { crearLimitador } from '../api/limite.js';
import { categoriaAire, avisoGruposSensibles } from '../src/dominio/salud/calidadAire';
import { nivelUv, recomendacionUv } from '../src/dominio/salud/indiceUv';

describe('normalizarAire', () => {
  it('extrae AQI, UV y polen del proveedor', () => {
    const normalizado = normalizarAire({
      timezone: 'Europe/Madrid',
      current: {
        us_aqi: 42,
        uv_index: 6.3,
        pm2_5: 12.1,
        pm10: 20,
        birch_pollen: 3,
        grass_pollen: 1
      }
    });

    expect(normalizado.indiceAire).toBe(42);
    expect(normalizado.uv).toBe(6.3);
    expect(normalizado.pm25).toBe(12.1);
    expect(normalizado.polen.abedul).toBe(3);
    expect(normalizado.polen.olivo).toBeNull();
  });

  it('devuelve null en las variables ausentes, sin inventarlas', () => {
    const normalizado = normalizarAire({ current: {} });
    expect(normalizado.indiceAire).toBeNull();
    expect(normalizado.uv).toBeNull();
    expect(normalizado.categoriaAire).toBeNull();
  });
});

describe('categorías de salud', () => {
  it('clasifica la calidad del aire y avisa a grupos sensibles', () => {
    expect(categoriaAire(30).nivel).toBe('buena');
    expect(avisoGruposSensibles(30)).toBeNull();
    expect(categoriaAire(120).nivel).toBe('danina_sensibles');
    expect(avisoGruposSensibles(120)).toMatch(/limitar el esfuerzo/i);
  });

  it('recomienda protección solar solo desde UV alto', () => {
    expect(nivelUv(3).nivel).toBe('moderado');
    expect(recomendacionUv(3)).toBeNull();
    expect(nivelUv(8).nivel).toBe('muy_alto');
    expect(recomendacionUv(8)).toMatch(/sol/i);
  });
});

describe('proxy de aire', () => {
  const configuracion = {
    proveedor: {},
    cache: { climaTtlMs: 600000, pronosticoTtlMs: 1800000, aireTtlMs: 1800000 },
    limite: { maximo: 100, ventanaMs: 600000 }
  };

  const crearManejador = (cliente) =>
    crearManejadorApi({
      configuracion,
      cliente,
      cache: crearCache(),
      limitador: crearLimitador({ maximo: 100, ventanaMs: 600000 })
    });

  it('responde el aire por coordenadas', async () => {
    const aire = { indiceAire: 42, uv: 6 };
    const cliente = { aire: vi.fn().mockResolvedValue(aire) };
    const manejador = crearManejador(cliente);

    const resultado = await manejador.manejar({
      ruta: '/aire',
      parametros: { lat: 40.4, lon: -3.7 }
    });

    expect(resultado.estado).toBe(200);
    expect(resultado.cuerpo.indiceAire).toBe(42);
    expect(cliente.aire).toHaveBeenCalledWith({ lat: 40.4, lon: -3.7 });
  });

  it('exige coordenadas en la ruta de aire', async () => {
    const manejador = crearManejador({ aire: vi.fn() });
    const resultado = await manejador.manejar({ ruta: '/aire', parametros: { q: 'Madrid' } });
    expect(resultado.estado).toBe(400);
  });
});
