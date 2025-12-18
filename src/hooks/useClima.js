import { useState, useEffect } from 'react';
import { obtenerClimaPorCiudad, obtenerClimaPorCoordenadas } from '../servicios/servicioClima';
import { transformarDatosClima } from '../utilidades/transformadores';

// Hook personalizado para manejar datos del clima
export const useClima = (ciudadInicial = '') => {
  const [datosClima, setDatosClima] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const obtenerClima = async (ciudad) => {
    setCargando(true);
    setError(null);
    
    try {
      const datos = await obtenerClimaPorCiudad(ciudad);
      const datosTransformados = transformarDatosClima(datos);
      setDatosClima(datosTransformados);
    } catch (err) {
      setError(err.message);
      setDatosClima(null);
    } finally {
      setCargando(false);
    }
  };

  const obtenerClimaPorUbicacion = async (latitud, longitud) => {
    setCargando(true);
    setError(null);
    
    try {
      const datos = await obtenerClimaPorCoordenadas(latitud, longitud);
      const datosTransformados = transformarDatosClima(datos);
      setDatosClima(datosTransformados);
    } catch (err) {
      setError(err.message);
      setDatosClima(null);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (ciudadInicial) {
      obtenerClima(ciudadInicial);
    }
  }, [ciudadInicial]);

  return {
    datosClima,
    cargando,
    error,
    obtenerClima,
    obtenerClimaPorUbicacion
  };
};
