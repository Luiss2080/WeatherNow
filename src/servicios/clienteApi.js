import axios from 'axios';
import { API_CONFIG } from '../constantes/configuracionApi';

// Instancia de axios con la configuración base de OpenWeather.
// La traducción de errores (404, 401, 429, red) se hace en `servicioClima`.
const clienteApi = axios.create({
  baseURL: API_CONFIG.URL_BASE,
  timeout: 10000,
  params: {
    appid: API_CONFIG.API_KEY,
    lang: API_CONFIG.IDIOMA,
    units: API_CONFIG.UNIDADES
  }
});

export default clienteApi;
