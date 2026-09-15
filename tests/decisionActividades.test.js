import { describe, it, expect } from 'vitest';
import { evaluarActividad, evaluarTodas } from '../src/dominio/decision/evaluarActividad';
import { NIVELES } from '../src/dominio/decision/actividades';

const condicionesBuenas = {
  temperatura: 18,
  sensacionTermica: 18,
  velocidadViento: 10,
  probabilidadLluvia: 10
};

describe('evaluarActividad', () => {
  it('da favorable con condiciones buenas', () => {
    const resultado = evaluarActividad('correr', condicionesBuenas);
    expect(resultado.nivel).toBe(NIVELES.FAVORABLE);
    expect(resultado.motivo).toMatch(/buenas condiciones/i);
  });

  it('baja a precaución con viento moderado', () => {
    const resultado = evaluarActividad('correr', { ...condicionesBuenas, velocidadViento: 35 });
    expect(resultado.nivel).toBe(NIVELES.PRECAUCION);
    expect(resultado.motivo).toMatch(/viento/i);
  });

  it('marca no recomendado con viento fuerte', () => {
    const resultado = evaluarActividad('correr', { ...condicionesBuenas, velocidadViento: 50 });
    expect(resultado.nivel).toBe(NIVELES.NO_RECOMENDADO);
  });

  it('marca no recomendado con temperatura extrema según la sensación térmica', () => {
    const resultado = evaluarActividad('correr', { ...condicionesBuenas, sensacionTermica: 35 });
    expect(resultado.nivel).toBe(NIVELES.NO_RECOMENDADO);
    expect(resultado.motivo).toMatch(/temperatura/i);
  });

  it('marca no recomendado con lluvia muy probable', () => {
    const resultado = evaluarActividad('correr', { ...condicionesBuenas, probabilidadLluvia: 80 });
    expect(resultado.nivel).toBe(NIVELES.NO_RECOMENDADO);
    expect(resultado.motivo).toMatch(/lluvia/i);
  });

  it('usa la peor variable como nivel final', () => {
    const resultado = evaluarActividad('correr', {
      ...condicionesBuenas,
      velocidadViento: 50,
      probabilidadLluvia: 20
    });
    expect(resultado.nivel).toBe(NIVELES.NO_RECOMENDADO);
  });

  it('aplica el UV alto como precaución', () => {
    const resultado = evaluarActividad('correr', { ...condicionesBuenas, uv: 7 });
    expect(resultado.nivel).toBe(NIVELES.PRECAUCION);
    expect(resultado.motivo).toMatch(/uv/i);
  });

  it('registra datos ausentes cuando el UV llega como null', () => {
    const resultado = evaluarActividad('correr', { ...condicionesBuenas, uv: null });
    expect(resultado.datosAusentes).toContain('uv');
  });

  it('no marca el UV como ausente si no se solicita (undefined)', () => {
    const resultado = evaluarActividad('correr', condicionesBuenas);
    expect(resultado.datosAusentes).not.toContain('uv');
  });

  it('ignora el UV en actividades sin regla de UV (ropa)', () => {
    const resultado = evaluarActividad('ropa', { ...condicionesBuenas, uv: 11 });
    expect(resultado.datosAusentes).not.toContain('uv');
    expect(resultado.nivel).toBe(NIVELES.FAVORABLE);
  });

  it('devuelve null para una actividad desconocida', () => {
    expect(evaluarActividad('volar', condicionesBuenas)).toBeNull();
  });

  it('evalúa las seis actividades del MVP', () => {
    expect(evaluarTodas(condicionesBuenas)).toHaveLength(6);
  });
});
