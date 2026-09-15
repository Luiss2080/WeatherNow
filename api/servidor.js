import { createServer } from 'node:http';
import { crearConfiguracion } from './configuracion.js';
import { crearClienteOpenWeather } from './proveedores/openweather.js';
import { crearClienteOpenMeteo } from './proveedores/openmeteo.js';
import { crearManejadorApi } from './proxy.js';

// Servidor del proxy para despliegues Node (sin Vite).
const puerto = Number(process.env.API_PUERTO || 8787);
const configuracion = crearConfiguracion(process.env);
const cliente = {
  ...crearClienteOpenWeather({ configuracion }),
  ...crearClienteOpenMeteo({ configuracion })
};
const manejador = crearManejadorApi({ configuracion, cliente });

const servidor = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${puerto}`);

  if (!url.pathname.startsWith('/api/')) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ codigo: 'NO_ENCONTRADO', mensaje: 'Recurso no encontrado' }));
    return;
  }

  try {
    const resultado = await manejador.manejar({
      ruta: url.pathname.slice('/api'.length),
      parametros: Object.fromEntries(url.searchParams.entries()),
      clienteId: req.socket?.remoteAddress || 'anonimo'
    });
    res.statusCode = resultado.estado;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    Object.entries(resultado.cabeceras || {}).forEach(([clave, valor]) => {
      res.setHeader(clave, String(valor));
    });
    res.end(JSON.stringify(resultado.cuerpo));
  } catch {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ codigo: 'DESCONOCIDO', mensaje: 'Error interno del proxy' }));
  }
});

servidor.listen(puerto, () => {
  console.log(`API WeatherNow escuchando en http://localhost:${puerto}/api`);
});
