import { describe, it, expect } from 'vitest';
import { traducirError } from '../src/servicios/servicioClima';
import { CODIGOS_ERROR } from '../src/constantes/mensajes';

const conEstado = (status) => ({ response: { status } });

describe('traducirError', () => {
  it('traduce 404 a ciudad no encontrada', () => {
    expect(traducirError(conEstado(404)).codigo).toBe(CODIGOS_ERROR.CIUDAD_NO_ENCONTRADA);
  });

  it('traduce 401 y 403 a problema de configuración', () => {
    expect(traducirError(conEstado(401)).codigo).toBe(CODIGOS_ERROR.CONFIGURACION);
    expect(traducirError(conEstado(403)).codigo).toBe(CODIGOS_ERROR.CONFIGURACION);
  });

  it('traduce 429 a límite de peticiones', () => {
    expect(traducirError(conEstado(429)).codigo).toBe(CODIGOS_ERROR.LIMITE);
  });

  it('traduce un fallo de red (sin respuesta) a error de conexión', () => {
    expect(traducirError({ request: {}, message: 'Network Error' }).codigo).toBe(CODIGOS_ERROR.RED);
  });

  it('traduce otros estados a desconocido', () => {
    expect(traducirError(conEstado(500)).codigo).toBe(CODIGOS_ERROR.DESCONOCIDO);
  });

  it('es idempotente con un error que ya tiene código', () => {
    const original = new Error('x');
    original.codigo = CODIGOS_ERROR.LIMITE;
    expect(traducirError(original)).toBe(original);
  });
});
