import { describe, it, expect } from 'vitest';
import { formatearAntiguedad } from '../src/utilidades/tiempo';

describe('formatearAntiguedad', () => {
  const ahora = 1_000_000_000;

  it('describe menos de un minuto', () => {
    expect(formatearAntiguedad(ahora - 30_000, ahora)).toBe('hace menos de un minuto');
  });

  it('describe minutos, horas y días', () => {
    expect(formatearAntiguedad(ahora - 5 * 60_000, ahora)).toBe('hace 5 min');
    expect(formatearAntiguedad(ahora - 3 * 3_600_000, ahora)).toBe('hace 3 h');
    expect(formatearAntiguedad(ahora - 2 * 86_400_000, ahora)).toBe('hace 2 d');
  });

  it('devuelve cadena vacía con entradas no válidas', () => {
    expect(formatearAntiguedad(undefined, ahora)).toBe('');
    expect(formatearAntiguedad(NaN, ahora)).toBe('');
  });
});
