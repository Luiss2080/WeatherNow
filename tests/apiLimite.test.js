import { describe, it, expect } from 'vitest';
import { crearLimitador } from '../api/limite.js';

describe('crearLimitador', () => {
  it('permite hasta el máximo dentro de la ventana', () => {
    const limitador = crearLimitador({ maximo: 2, ventanaMs: 1000, ahora: () => 0 });

    expect(limitador.permitir('ip').permitido).toBe(true);
    expect(limitador.permitir('ip').permitido).toBe(true);
    expect(limitador.permitir('ip').permitido).toBe(false);
  });

  it('reinicia la cuota al pasar la ventana', () => {
    let momento = 0;
    const limitador = crearLimitador({ maximo: 1, ventanaMs: 1000, ahora: () => momento });

    expect(limitador.permitir('ip').permitido).toBe(true);
    expect(limitador.permitir('ip').permitido).toBe(false);

    momento = 1500;
    expect(limitador.permitir('ip').permitido).toBe(true);
  });

  it('cuenta por cliente de forma independiente', () => {
    const limitador = crearLimitador({ maximo: 1, ventanaMs: 1000, ahora: () => 0 });

    expect(limitador.permitir('a').permitido).toBe(true);
    expect(limitador.permitir('b').permitido).toBe(true);
    expect(limitador.permitir('a').permitido).toBe(false);
  });
});
