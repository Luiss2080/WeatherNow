import { describe, it, expect } from 'vitest';
import { mejorFranja, condicionesDesdeClima } from '../src/dominio/decision/franjas';
import { NIVELES } from '../src/dominio/decision/actividades';

describe('condicionesDesdeClima', () => {
  it('toma la probabilidad de lluvia de la franja más cercana', () => {
    const datosClima = {
      temperatura: 18,
      sensacionTermica: 18,
      velocidadViento: 8,
      timestamp: 1000
    };
    const franjas = [
      { fecha: 2000, zonaHoraria: 0, temperatura: 19, velocidadViento: 8, probabilidadLluvia: 10 },
      { fecha: 3600, zonaHoraria: 0, temperatura: 20, velocidadViento: 9, probabilidadLluvia: 80 }
    ];

    const condiciones = condicionesDesdeClima(datosClima, franjas);

    expect(condiciones.probabilidadLluvia).toBe(10);
    expect(condiciones.temperatura).toBe(18);
  });

  it('deja la lluvia como null si no hay pronóstico', () => {
    const condiciones = condicionesDesdeClima({ temperatura: 18 }, []);
    expect(condiciones.probabilidadLluvia).toBeNull();
  });
});

describe('mejorFranja', () => {
  it('elige la franja favorable frente a la lluviosa', () => {
    const franjas = [
      { fecha: 1000, zonaHoraria: 0, temperatura: 18, velocidadViento: 10, probabilidadLluvia: 80 },
      { fecha: 4600, zonaHoraria: 0, temperatura: 20, velocidadViento: 8, probabilidadLluvia: 5 }
    ];

    const mejor = mejorFranja('correr', franjas);

    expect(mejor.indice).toBe(1);
    expect(mejor.veredicto.nivel).toBe(NIVELES.FAVORABLE);
  });

  it('a igualdad de nivel elige la temperatura más cercana al rango ideal', () => {
    const franjas = [
      { fecha: 1000, zonaHoraria: 0, temperatura: 20, velocidadViento: 5, probabilidadLluvia: 0 },
      { fecha: 4600, zonaHoraria: 0, temperatura: 16, velocidadViento: 5, probabilidadLluvia: 0 }
    ];

    const mejor = mejorFranja('correr', franjas);

    expect(mejor.indice).toBe(1);
  });

  it('devuelve null sin franjas o con actividad desconocida', () => {
    expect(mejorFranja('correr', [])).toBeNull();
    expect(mejorFranja('volar', [{ fecha: 1, temperatura: 20 }])).toBeNull();
  });
});
