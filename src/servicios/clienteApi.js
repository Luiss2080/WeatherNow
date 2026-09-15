import axios from 'axios';
import { API_CONFIG } from '../constantes/configuracionApi';

// El cliente habla con el proxy propio (/api); nunca con el proveedor externo.
// La traducción de errores (404, 401, 429, red) se hace en `servicioClima`.
const clienteApi = axios.create({
  baseURL: API_CONFIG.URL_BASE,
  timeout: 10000
});

export default clienteApi;
