// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import {
  agregarFavorito,
  eliminarFavorito,
  reordenarFavoritos,
  esLugarValido,
  crearLugarDesdeClima,
  leerFavoritos,
  guardarFavoritos,
  CLAVE_FAVORITOS,
  LIMITE_FAVORITOS_GRATIS
} from '../src/almacenamiento/favoritos';
import {
  leerPreferencias,
  guardarPreferencias,
  CLAVE_PREFERENCIAS,
  PREFERENCIAS_POR_DEFECTO
} from '../src/almacenamiento/preferencias';
import {
  leerUltimoLugar,
  guardarUltimoLugar,
  CLAVE_ULTIMO_LUGAR
} from '../src/almacenamiento/ultimoLugar';

const lugar = (id, nombre) => ({ id, nombre, pais: 'ES', lat: 40, lon: -3 });

beforeEach(() => {
  window.localStorage.clear();
});

describe('favoritos', () => {
  it('valida lugares', () => {
    expect(esLugarValido(lugar('a', 'Madrid'))).toBe(true);
    expect(esLugarValido({ nombre: 'Madrid' })).toBe(false);
    expect(esLugarValido({ nombre: '  ', lat: 1, lon: 2 })).toBe(false);
    expect(esLugarValido(null)).toBe(false);
  });

  it('construye un lugar a partir del clima', () => {
    const creado = crearLugarDesdeClima({
      ciudad: 'Madrid',
      pais: 'ES',
      coordenadas: { latitud: 40.4168, longitud: -3.7038 },
      zonaHoraria: 7200
    });
    expect(creado.id).toBe('40.417,-3.704');
    expect(creado.nombre).toBe('Madrid');
    expect(creado.zonaHoraria).toBe(7200);
  });

  it('agrega sin duplicar y respeta el límite gratuito', () => {
    let lista = [];
    lista = agregarFavorito(lista, lugar('a', 'Madrid'));
    lista = agregarFavorito(lista, lugar('a', 'Madrid'));
    expect(lista).toHaveLength(1);

    lista = agregarFavorito(lista, lugar('b', 'Lima'));
    lista = agregarFavorito(lista, lugar('c', 'Tokio'));
    lista = agregarFavorito(lista, lugar('d', 'París'));
    expect(lista).toHaveLength(LIMITE_FAVORITOS_GRATIS);
  });

  it('elimina y reordena', () => {
    const lista = [lugar('a', 'Madrid'), lugar('b', 'Lima'), lugar('c', 'Tokio')];
    expect(eliminarFavorito(lista, 'b').map((l) => l.id)).toEqual(['a', 'c']);
    expect(reordenarFavoritos(lista, 0, 2).map((l) => l.id)).toEqual(['b', 'c', 'a']);
    expect(reordenarFavoritos(lista, 5, 0)).toBe(lista);
  });

  it('persiste y se recupera del almacenamiento', () => {
    guardarFavoritos([lugar('a', 'Madrid')]);
    expect(leerFavoritos()).toHaveLength(1);
  });

  it('recupera lista vacía ante datos corruptos', () => {
    window.localStorage.setItem(CLAVE_FAVORITOS, '{no-json');
    expect(leerFavoritos()).toEqual([]);
  });
});

describe('preferencias', () => {
  it('usa los valores por defecto cuando no hay nada guardado', () => {
    expect(leerPreferencias()).toEqual(PREFERENCIAS_POR_DEFECTO);
  });

  it('sanea valores inválidos', () => {
    window.localStorage.setItem(
      CLAVE_PREFERENCIAS,
      JSON.stringify({ unidades: 'marciano', plan: 'plutonio' })
    );
    expect(leerPreferencias()).toEqual(PREFERENCIAS_POR_DEFECTO);
  });

  it('guarda y lee valores válidos', () => {
    guardarPreferencias({ unidades: 'imperial', plan: 'premium' });
    expect(leerPreferencias()).toEqual({ unidades: 'imperial', plan: 'premium' });
  });
});

describe('último lugar', () => {
  it('guarda y recupera un lugar válido', () => {
    guardarUltimoLugar(lugar('a', 'Madrid'));
    expect(leerUltimoLugar().nombre).toBe('Madrid');
  });

  it('devuelve null ante datos inválidos', () => {
    window.localStorage.setItem(CLAVE_ULTIMO_LUGAR, JSON.stringify({ nombre: '' }));
    expect(leerUltimoLugar()).toBeNull();
  });
});
