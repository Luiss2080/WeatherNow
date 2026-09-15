import { CODIGOS_ERROR } from '../../src/constantes/mensajes.js';
import { categoriaAire } from '../../src/dominio/salud/calidadAire.js';
import { crearErrorApi } from '../errores.js';

const numeroONull = (valor) => (typeof valor === 'number' && Number.isFinite(valor) ? valor : null);

// Normaliza la respuesta de Open-Meteo Air Quality a un contrato estable.
export const normalizarAire = (datos) => {
  const actual = datos?.current || {};
  const indiceAire = numeroONull(actual.us_aqi);

  return {
    indiceAire,
    categoriaAire: categoriaAire(indiceAire)?.nivel || null,
    uv: numeroONull(actual.uv_index),
    pm25: numeroONull(actual.pm2_5),
    pm10: numeroONull(actual.pm10),
    polen: {
      aliso: numeroONull(actual.alder_pollen),
      abedul: numeroONull(actual.birch_pollen),
      gramineas: numeroONull(actual.grass_pollen),
      artemisa: numeroONull(actual.mugwort_pollen),
      olivo: numeroONull(actual.olive_pollen),
      ambrosia: numeroONull(actual.ragweed_pollen)
    },
    zonaHoraria: datos?.timezone || null
  };
};

const VARIABLES_ACTUALES = [
  'us_aqi',
  'pm10',
  'pm2_5',
  'uv_index',
  'alder_pollen',
  'birch_pollen',
  'grass_pollen',
  'mugwort_pollen',
  'olive_pollen',
  'ragweed_pollen'
].join(',');

const construirUrl = (urlBase, { lat, lon }) => {
  const url = new URL(urlBase);
  url.searchParams.set('latitude', String(lat));
  url.searchParams.set('longitude', String(lon));
  url.searchParams.set('current', VARIABLES_ACTUALES);
  url.searchParams.set('timezone', 'auto');
  return url.toString();
};

// Cliente de Open-Meteo Air Quality (UV, AQI y polen). No requiere clave.
export const crearClienteOpenMeteo = ({ configuracion, fetchImpl = fetch }) => {
  const { urlBase } = configuracion.aire;

  const aire = async ({ lat, lon }) => {
    let respuesta;
    try {
      respuesta = await fetchImpl(construirUrl(urlBase, { lat, lon }));
    } catch {
      throw crearErrorApi(CODIGOS_ERROR.RED);
    }

    if (!respuesta.ok) throw crearErrorApi(CODIGOS_ERROR.DESCONOCIDO);
    return normalizarAire(await respuesta.json());
  };

  return { aire };
};
