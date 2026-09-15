import { describe, it, expect, vi, afterEach } from 'vitest';
import { obtenerUbicacionActual } from '../src/servicios/servicioGeolocalizacion';

describe('obtenerUbicacionActual', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('resuelve las coordenadas cuando el navegador las entrega', async () => {
    vi.stubGlobal('navigator', {
      geolocation: {
        getCurrentPosition: (exito) => exito({ coords: { latitude: 40.4, longitude: -3.7 } })
      }
    });

    await expect(obtenerUbicacionActual()).resolves.toEqual({
      latitud: 40.4,
      longitud: -3.7
    });
  });

  it('informa de permiso denegado de forma específica', async () => {
    vi.stubGlobal('navigator', {
      geolocation: {
        getCurrentPosition: (_exito, fallo) => fallo({ code: 1 })
      }
    });

    await expect(obtenerUbicacionActual()).rejects.toThrow(/denegado/i);
  });

  it('informa cuando el navegador no soporta geolocalización', async () => {
    vi.stubGlobal('navigator', {});

    await expect(obtenerUbicacionActual()).rejects.toThrow(/no está soportada/i);
  });
});
