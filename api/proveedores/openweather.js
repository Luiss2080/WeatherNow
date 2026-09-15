import { CODIGOS_ERROR } from '../../src/constantes/mensajes.js';
import { crearErrorApi } from '../errores.js';

const codigoDesdeEstado = (estado) => {
  if (estado === 404) return CODIGOS_ERROR.CIUDAD_NO_ENCONTRADA;
  if (estado === 401 || estado === 403) return CODIGOS_ERROR.CONFIGURACION;
  if (estado === 429) return CODIGOS_ERROR.LIMITE;
  return CODIGOS_ERROR.DESCONOCIDO;
};

// Cliente del proveedor OpenWeather. La clave se añade aquí, en el servidor.
export const crearClienteOpenWeather = ({ configuracion, fetchImpl = fetch }) => {
  const { urlBase, apiKey, idioma, unidades } = configuracion.proveedor;

  const construirUrl = (ruta, parametros) => {
    const url = new URL(`${urlBase.replace(/\/$/, '')}${ruta}`);
    Object.entries(parametros).forEach(([clave, valor]) => {
      if (valor !== undefined && valor !== null) url.searchParams.set(clave, String(valor));
    });
    url.searchParams.set('appid', apiKey);
    url.searchParams.set('lang', idioma);
    url.searchParams.set('units', unidades);
    return url.toString();
  };

  const solicitar = async (ruta, parametros) => {
    if (!apiKey) throw crearErrorApi(CODIGOS_ERROR.CONFIGURACION);

    let respuesta;
    try {
      respuesta = await fetchImpl(construirUrl(ruta, parametros));
    } catch {
      throw crearErrorApi(CODIGOS_ERROR.RED);
    }

    if (!respuesta.ok) throw crearErrorApi(codigoDesdeEstado(respuesta.status));
    return respuesta.json();
  };

  return {
    clima: (parametros) => solicitar('/weather', parametros),
    pronostico: (parametros) => solicitar('/forecast', parametros)
  };
};
