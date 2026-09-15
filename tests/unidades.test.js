import { describe, it, expect } from 'vitest';
import {
  UNIDADES,
  formatearTemperatura,
  formatearVelocidadViento,
  formatearVisibilidad
} from '../src/utilidades/formateadores';
import { evaluarActividad } from '../src/dominio/decision/evaluarActividad';

describe('unidades', () => {
  it('convierte la temperatura a Fahrenheit', () => {
    expect(formatearTemperatura(0, UNIDADES.IMPERIAL)).toBe('32°F');
    expect(formatearTemperatura(100, UNIDADES.IMPERIAL)).toBe('212°F');
  });

  it('convierte la velocidad a mph', () => {
    expect(formatearVelocidadViento(100, UNIDADES.IMPERIAL)).toBe('62 mph');
  });

  it('convierte la visibilidad a millas', () => {
    expect(formatearVisibilidad(16093.44, UNIDADES.IMPERIAL)).toBe('10.0 mi');
  });

  it('mantiene el sistema métrico por defecto', () => {
    expect(formatearTemperatura(20)).toBe('20°C');
    expect(formatearVelocidadViento(10)).toBe('10 km/h');
  });

  it('formatea el motivo del veredicto en unidades imperiales', () => {
    const resultado = evaluarActividad(
      'correr',
      { temperatura: 18, sensacionTermica: 30, velocidadViento: 10, probabilidadLluvia: 0 },
      { unidades: UNIDADES.IMPERIAL }
    );
    expect(resultado.motivo).toMatch(/86°F/);
  });
});
