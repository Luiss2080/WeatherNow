import { leer, escribir } from './almacenLocal';
import { obtenerTipoAlerta } from '../dominio/alertas/condiciones';

export const CLAVE_ALERTAS = 'weathernow.alertas';
export const LIMITE_ALERTAS_GRATIS = 1;

export const esAlertaValida = (alerta) =>
  Boolean(alerta) &&
  typeof alerta.id === 'string' &&
  typeof alerta.lugarId === 'string' &&
  obtenerTipoAlerta(alerta.condicion) !== null &&
  typeof alerta.umbral === 'number' &&
  Number.isFinite(alerta.umbral);

export const leerAlertas = () => {
  const datos = leer(CLAVE_ALERTAS, []);
  if (!Array.isArray(datos)) return [];
  return datos.filter(esAlertaValida);
};

export const guardarAlertas = (alertas) => escribir(CLAVE_ALERTAS, alertas);
