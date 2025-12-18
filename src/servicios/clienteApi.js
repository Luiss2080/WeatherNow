import axios from 'axios';
import { API_CONFIG } from '../constantes/configuracionApi';

// Crear instancia de axios con configuración base
const clienteApi = axios.create({
  baseURL: API_CONFIG.URL_BASE,
  timeout: 10000,
  params: {
    appid: API_CONFIG.API_KEY,
    lang: API_CONFIG.IDIOMA,
    units: API_CONFIG.UNIDADES
  }
});

// Interceptor para manejar respuestas
clienteApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la petición:', error);
    return Promise.reject(error);
  }
);

export default clienteApi;
