import { leer, escribir } from './almacenLocal';

export const CLAVE_INSTANTANEA = 'weathernow.instantanea';

// Último dato completo mostrado, para poder verlo sin conexión.
export const leerInstantanea = () => {
  const datos = leer(CLAVE_INSTANTANEA, null);
  if (!datos || typeof datos !== 'object') return null;
  if (!datos.datosClima || typeof datos.guardadoEn !== 'number') return null;
  return datos;
};

export const guardarInstantanea = (instantanea) => escribir(CLAVE_INSTANTANEA, instantanea);
