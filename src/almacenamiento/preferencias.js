import { leer, escribir } from './almacenLocal';
import { UNIDADES } from '../utilidades/formateadores';

export const CLAVE_PREFERENCIAS = 'weathernow.preferencias';
export const PLANES = { GRATIS: 'gratis', PREMIUM: 'premium' };
export const PREFERENCIAS_POR_DEFECTO = { unidades: UNIDADES.METRICO, plan: PLANES.GRATIS };

const UNIDADES_VALIDAS = [UNIDADES.METRICO, UNIDADES.IMPERIAL];
const PLANES_VALIDOS = [PLANES.GRATIS, PLANES.PREMIUM];

const sanear = (datos) => ({
  unidades: UNIDADES_VALIDAS.includes(datos?.unidades)
    ? datos.unidades
    : PREFERENCIAS_POR_DEFECTO.unidades,
  plan: PLANES_VALIDOS.includes(datos?.plan) ? datos.plan : PREFERENCIAS_POR_DEFECTO.plan
});

export const leerPreferencias = () => sanear(leer(CLAVE_PREFERENCIAS, {}));

export const guardarPreferencias = (preferencias) =>
  escribir(CLAVE_PREFERENCIAS, sanear(preferencias));
