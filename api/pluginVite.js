import { crearConfiguracion } from './configuracion.js';
import { crearClienteOpenWeather } from './proveedores/openweather.js';
import { crearManejadorApi } from './proxy.js';

const enviarJson = (res, resultado) => {
  res.statusCode = resultado.estado;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  Object.entries(resultado.cabeceras || {}).forEach(([clave, valor]) => {
    res.setHeader(clave, String(valor));
  });
  res.end(JSON.stringify(resultado.cuerpo));
};

// Plugin de Vite: monta el proxy en `/api` durante el desarrollo.
export const pluginApi = (entorno = {}) => {
  const configuracion = crearConfiguracion(entorno);
  const cliente = crearClienteOpenWeather({ configuracion });
  const manejador = crearManejadorApi({ configuracion, cliente });

  return {
    name: 'weathernow-api',
    apply: 'serve',
    configureServer(servidor) {
      servidor.middlewares.use('/api', async (req, res) => {
        try {
          const url = new URL(req.url, 'http://localhost');
          const resultado = await manejador.manejar({
            ruta: url.pathname,
            parametros: Object.fromEntries(url.searchParams.entries()),
            clienteId: req.socket?.remoteAddress || 'anonimo'
          });
          enviarJson(res, resultado);
        } catch {
          enviarJson(res, {
            estado: 500,
            cuerpo: { codigo: 'DESCONOCIDO', mensaje: 'Error interno del proxy' }
          });
        }
      });
    }
  };
};
