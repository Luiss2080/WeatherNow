import { describe, it, expect } from 'vitest';
import { crearCache } from '../api/cache.js';

describe('crearCache', () => {
  it('devuelve el valor guardado mientras no expire', () => {
    let momento = 1000;
    const cache = crearCache({ ahora: () => momento });

    cache.guardar('clima:madrid', { temperatura: 20 }, 5000);

    expect(cache.obtener('clima:madrid')).toEqual({
      acertado: true,
      valor: { temperatura: 20 }
    });
  });

  it('expira la entrada pasada la TTL', () => {
    let momento = 1000;
    const cache = crearCache({ ahora: () => momento });

    cache.guardar('clima:madrid', { temperatura: 20 }, 5000);
    momento = 7000;

    expect(cache.obtener('clima:madrid').acertado).toBe(false);
    expect(cache.tamano()).toBe(0);
  });
});
