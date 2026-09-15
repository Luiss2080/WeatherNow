import { leer, escribir } from './almacenLocal';

export const CLAVE_FAVORITOS = 'weathernow.favoritos';
export const LIMITE_FAVORITOS_GRATIS = 3;

export const esLugarValido = (lugar) =>
  Boolean(lugar) &&
  typeof lugar.nombre === 'string' &&
  lugar.nombre.trim().length > 0 &&
  Number.isFinite(lugar.lat) &&
  Number.isFinite(lugar.lon);

export const crearLugarDesdeClima = (datosClima) => ({
  id: `${Number(datosClima.coordenadas.latitud).toFixed(3)},${Number(
    datosClima.coordenadas.longitud
  ).toFixed(3)}`,
  nombre: datosClima.ciudad,
  pais: datosClima.pais || '',
  lat: datosClima.coordenadas.latitud,
  lon: datosClima.coordenadas.longitud,
  zonaHoraria: datosClima.zonaHoraria || 0
});

export const agregarFavorito = (favoritos, lugar, limite = LIMITE_FAVORITOS_GRATIS) => {
  if (!esLugarValido(lugar)) return favoritos;
  if (favoritos.some((favorito) => favorito.id === lugar.id)) return favoritos;
  if (favoritos.length >= limite) return favoritos;
  return [...favoritos, lugar];
};

export const eliminarFavorito = (favoritos, id) => favoritos.filter((favorito) => favorito.id !== id);

export const reordenarFavoritos = (favoritos, desde, hasta) => {
  const fueraDeRango =
    desde < 0 ||
    hasta < 0 ||
    desde >= favoritos.length ||
    hasta >= favoritos.length ||
    desde === hasta;
  if (fueraDeRango) return favoritos;

  const copia = [...favoritos];
  const [movido] = copia.splice(desde, 1);
  copia.splice(hasta, 0, movido);
  return copia;
};

export const leerFavoritos = () => {
  const datos = leer(CLAVE_FAVORITOS, []);
  if (!Array.isArray(datos)) return [];
  return datos.filter(esLugarValido).slice(0, LIMITE_FAVORITOS_GRATIS);
};

export const guardarFavoritos = (favoritos) => escribir(CLAVE_FAVORITOS, favoritos);
