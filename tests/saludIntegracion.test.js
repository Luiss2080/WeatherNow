import { describe, it, expect } from 'vitest';
import { condicionesDesdeClima } from '../src/dominio/decision/franjas';
import { evaluarActividad } from '../src/dominio/decision/evaluarActividad';
import { NIVELES } from '../src/dominio/decision/actividades';

describe('integración de salud en el motor de decisión', () => {
  it('añade UV y AQI a las condiciones cuando hay datos de aire', () => {
    const condiciones = condicionesDesdeClima(
      { temperatura: 18, sensacionTermica: 18, velocidadViento: 8, timestamp: 1000 },
      [],
      { uv: 8, indiceAire: 160 }
    );

    expect(condiciones.uv).toBe(8);
    expect(condiciones.aqi).toBe(160);
  });

  it('deja UV y AQI sin definir si no hay datos de aire', () => {
    const condiciones = condicionesDesdeClima(
      { temperatura: 18, sensacionTermica: 18, velocidadViento: 8, timestamp: 1000 },
      []
    );

    expect(condiciones.uv).toBeUndefined();
    expect(condiciones.aqi).toBeUndefined();
  });

  it('degrada el veredicto con calidad del aire dañina', () => {
    const resultado = evaluarActividad('correr', {
      temperatura: 18,
      sensacionTermica: 18,
      velocidadViento: 8,
      probabilidadLluvia: 0,
      aqi: 160
    });

    expect(resultado.nivel).toBe(NIVELES.NO_RECOMENDADO);
    expect(resultado.motivo).toMatch(/calidad del aire/i);
  });

  it('degrada el veredicto con UV muy alto', () => {
    const resultado = evaluarActividad('correr', {
      temperatura: 18,
      sensacionTermica: 18,
      velocidadViento: 8,
      probabilidadLluvia: 0,
      uv: 9
    });

    expect(resultado.nivel).toBe(NIVELES.NO_RECOMENDADO);
    expect(resultado.motivo).toMatch(/uv/i);
  });

  it('marca UV y AQI como ausentes cuando llegan como null', () => {
    const resultado = evaluarActividad('correr', {
      temperatura: 18,
      sensacionTermica: 18,
      velocidadViento: 8,
      probabilidadLluvia: 0,
      uv: null,
      aqi: null
    });

    expect(resultado.datosAusentes).toContain('uv');
    expect(resultado.datosAusentes).toContain('aqi');
  });
});
