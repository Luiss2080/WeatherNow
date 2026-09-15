import { leer, escribir } from './almacenLocal';
import { esLugarValido } from './favoritos';

export const CLAVE_ULTIMO_LUGAR = 'weathernow.ultimoLugar';

export const leerUltimoLugar = () => {
  const datos = leer(CLAVE_ULTIMO_LUGAR, null);
  return esLugarValido(datos) ? datos : null;
};

export const guardarUltimoLugar = (lugar) =>
  esLugarValido(lugar) ? escribir(CLAVE_ULTIMO_LUGAR, lugar) : false;
