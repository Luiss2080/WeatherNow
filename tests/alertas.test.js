import { describe, it, expect, beforeEach } from 'vitest';
import { TIPOS_ALERTA } from '../src/dominio/alertas/condiciones';
import { evaluarAlerta } from '../src/dominio/alertas/evaluarAlerta';
import {
  esAlertaValida,
  leerAlertas,
  guardarAlertas,
  CLAVE_ALERTAS
} from '../src/almacenamiento/alertas';

const LUGAR_ID = '40.417,-3.704';

const alerta = (condicion, umbral, activa = true) => ({
  id: `${LUGAR_ID}:${condicion}`,
  lugarId: LUGAR_ID,
  lugarNombre: 'Madrid',
  condicion,
  umbral,
  activa
});

const franjas = [
  { fecha: 1000, zonaHoraria: 0, temperatura: 18, velocidadViento: 5, probabilidadLluvia: 20 },
  { fecha: 4600, zonaHoraria: 0, temperatura: 22, velocidadViento: 45, probabilidadLluvia: 80 }
];

beforeEach(() => {
  window.localStorage.clear();
});

describe('condiciones de alerta', () => {
  it('evalúa la lluvia por probabilidad', () => {
    expect(TIPOS_ALERTA.lluvia.evaluar({ probabilidadLluvia: 60 }, 50)).toBe(true);
    expect(TIPOS_ALERTA.lluvia.evaluar({ probabilidadLluvia: 20 }, 50)).toBe(false);
  });

  it('evalúa el viento y la temperatura', () => {
    expect(TIPOS_ALERTA.viento.evaluar({ velocidadViento: 45 }, 40)).toBe(true);
    expect(TIPOS_ALERTA.calor.evaluar({ temperatura: 32 }, 30)).toBe(true);
    expect(TIPOS_ALERTA.frio.evaluar({ temperatura: 1 }, 2)).toBe(true);
  });

  it('devuelve null para un tipo desconocido', () => {
    expect(TIPOS_ALERTA.noExiste).toBeUndefined();
  });
});

describe('evaluarAlerta', () => {
  it('se cumple cuando alguna franja supera el umbral', () => {
    const resultado = evaluarAlerta(alerta('lluvia', 50), { franjas });
    expect(resultado.cumplida).toBe(true);
    expect(resultado.indice).toBe(1);
  });

  it('no se cumple si ninguna franja lo supera', () => {
    expect(evaluarAlerta(alerta('lluvia', 90), { franjas }).cumplida).toBe(false);
  });

  it('ignora las alertas pausadas', () => {
    expect(evaluarAlerta(alerta('lluvia', 50, false), { franjas }).cumplida).toBe(false);
  });

  it('usa el UV actual del aire', () => {
    const resultado = evaluarAlerta(alerta('uv', 6), {
      franjas,
      aire: { uv: 8, indiceAire: 40 }
    });
    expect(resultado.cumplida).toBe(true);
  });

  it('no dispara UV si no hay datos de aire', () => {
    expect(evaluarAlerta(alerta('uv', 6), { franjas, aire: null }).cumplida).toBe(false);
  });
});

describe('almacenamiento de alertas', () => {
  it('valida alertas', () => {
    expect(esAlertaValida(alerta('lluvia', 50))).toBe(true);
    expect(esAlertaValida({ id: 'x', lugarId: LUGAR_ID, condicion: 'inventada', umbral: 1 })).toBe(
      false
    );
    expect(esAlertaValida(null)).toBe(false);
  });

  it('persiste y filtra alertas inválidas', () => {
    guardarAlertas([alerta('lluvia', 50)]);
    expect(leerAlertas()).toHaveLength(1);

    window.localStorage.setItem(CLAVE_ALERTAS, JSON.stringify([{ id: 'malo' }]));
    expect(leerAlertas()).toEqual([]);
  });
});
