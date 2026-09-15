import { describe, it, expect } from 'vitest';
import {
  formatearTemperatura,
  formatearPorcentaje,
  formatearVelocidadViento,
  formatearPresion,
  formatearVisibilidad,
  formatearHora,
  formatearFechaCorta,
  claveDia
} from '../src/utilidades/formateadores';

describe('formateadores numéricos', () => {
  it('redondea la temperatura', () => {
    expect(formatearTemperatura(21.6)).toBe('22°C');
    expect(formatearTemperatura(21.4)).toBe('21°C');
  });

  it('devuelve un placeholder con valores inválidos o ausentes', () => {
    expect(formatearTemperatura(undefined)).toBe('--°C');
    expect(formatearTemperatura(NaN)).toBe('--°C');
    expect(formatearPorcentaje(null)).toBe('--%');
    expect(formatearVelocidadViento(undefined)).toBe('-- km/h');
    expect(formatearPresion(undefined)).toBe('-- hPa');
    expect(formatearVisibilidad(undefined)).toBe('-- km');
  });

  it('convierte la visibilidad de metros a kilómetros', () => {
    expect(formatearVisibilidad(10500)).toBe('10.5 km');
    expect(formatearPorcentaje(66.4)).toBe('66%');
    expect(formatearVelocidadViento(12.2)).toBe('12 km/h');
  });
});

describe('formateadores de hora y fecha según el huso de la ciudad', () => {
  // 2020-09-13T12:26:40Z
  const ts = 1600000000;

  it('aplica el offset horario', () => {
    expect(formatearHora(ts, 0)).toBe('12:26');
    expect(formatearHora(ts, 3600)).toBe('13:26');
    expect(formatearHora(ts, -18000)).toBe('07:26');
  });

  it('calcula la clave de día con el offset', () => {
    // 2020-09-13T23:30:00Z
    const tsNoche = 1600039800;
    expect(claveDia(tsNoche, 0)).toBe('2020-09-13');
    expect(claveDia(tsNoche, 3600)).toBe('2020-09-14');
  });

  it('formatea la fecha corta en el huso indicado', () => {
    expect(formatearFechaCorta(ts, 0)).toMatch(/13/);
  });
});
