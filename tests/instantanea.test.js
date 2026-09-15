import { describe, it, expect, beforeEach } from 'vitest';
import {
  leerInstantanea,
  guardarInstantanea,
  CLAVE_INSTANTANEA
} from '../src/almacenamiento/cacheClima';

beforeEach(() => {
  window.localStorage.clear();
});

describe('instantánea de datos para uso sin conexión', () => {
  it('guarda y recupera la última instantánea', () => {
    guardarInstantanea({
      datosClima: { ciudad: 'Madrid' },
      datosPronostico: [],
      datosAire: null,
      guardadoEn: 123
    });

    const instantanea = leerInstantanea();
    expect(instantanea.datosClima.ciudad).toBe('Madrid');
    expect(instantanea.guardadoEn).toBe(123);
  });

  it('devuelve null ante datos inválidos o corruptos', () => {
    expect(leerInstantanea()).toBeNull();

    window.localStorage.setItem(CLAVE_INSTANTANEA, '{no-json');
    expect(leerInstantanea()).toBeNull();

    window.localStorage.setItem(CLAVE_INSTANTANEA, JSON.stringify({ guardadoEn: 1 }));
    expect(leerInstantanea()).toBeNull();
  });
});
