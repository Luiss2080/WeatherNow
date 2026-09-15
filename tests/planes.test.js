import { describe, it, expect } from 'vitest';
import {
  limiteAlertas,
  limiteFavoritos,
  mostrarPublicidad,
  obtenerPlan
} from '../src/dominio/planes';

describe('planes', () => {
  it('define los límites del plan gratuito', () => {
    expect(limiteFavoritos('gratis')).toBe(3);
    expect(limiteAlertas('gratis')).toBe(1);
    expect(mostrarPublicidad('gratis')).toBe(true);
  });

  it('el plan premium no tiene publicidad y amplía los límites', () => {
    expect(mostrarPublicidad('premium')).toBe(false);
    expect(limiteFavoritos('premium')).toBeGreaterThan(1000);
    expect(limiteAlertas('premium')).toBeGreaterThan(1000);
  });

  it('cae al plan gratuito ante un plan desconocido', () => {
    expect(obtenerPlan('inventado')).toBe(obtenerPlan('gratis'));
  });
});
