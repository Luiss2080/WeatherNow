import { describe, it, expect } from 'vitest';
import { validarNombreCiudad, validarCoordenadas } from '../src/utilidades/validadores';

describe('validarNombreCiudad', () => {
  it('rechaza vacío o solo espacios', () => {
    expect(validarNombreCiudad('').valido).toBe(false);
    expect(validarNombreCiudad('   ').valido).toBe(false);
    expect(validarNombreCiudad(undefined).valido).toBe(false);
  });

  it('rechaza nombres de un carácter', () => {
    expect(validarNombreCiudad('M').valido).toBe(false);
  });

  it('acepta nombres de dos o más caracteres', () => {
    expect(validarNombreCiudad('Ma').valido).toBe(true);
    expect(validarNombreCiudad('  Madrid  ').valido).toBe(true);
  });
});

describe('validarCoordenadas', () => {
  it('rechaza latitudes fuera de rango', () => {
    expect(validarCoordenadas(91, 0).valido).toBe(false);
    expect(validarCoordenadas(-91, 0).valido).toBe(false);
  });

  it('rechaza longitudes fuera de rango', () => {
    expect(validarCoordenadas(0, 181).valido).toBe(false);
    expect(validarCoordenadas(0, -181).valido).toBe(false);
  });

  it('acepta coordenadas válidas', () => {
    expect(validarCoordenadas(40.4, -3.7).valido).toBe(true);
  });
});
