import { useState } from 'react';
import { obtenerPronostico, obtenerPronosticoPorCoordenadas } from '../servicios/servicioClima';
import { transformarDatosPronostico, agruparPronosticoPorDias } from '../utilidades/transformadores';

// Hook para manejar el pronóstico del clima
export const usePronostico = () => {
  const [datosPronostico, setDatosPronostico] = useState([]);
  const [pronosticoPorDias, setPronosticoPorDias] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const obtenerPronosticoExtendido = async (ciudad) => {
    setCargando(true);
    setError(null);
    
    try {
      const datos = await obtenerPronostico(ciudad);
      const datosTransformados = transformarDatosPronostico(datos);
      const datosPorDias = agruparPronosticoPorDias(datosTransformados);
      
      setDatosPronostico(datosTransformados);
      setPronosticoPorDias(datosPorDias);
    } catch (err) {
      setError(err.message);
      setDatosPronostico([]);
      setPronosticoPorDias([]);
    } finally {
      setCargando(false);
    }
  };

  const obtenerPronosticoPorUbicacion = async (latitud, longitud) => {
    setCargando(true);
    setError(null);
    
    try {
      const datos = await obtenerPronosticoPorCoordenadas(latitud, longitud);
      const datosTransformados = transformarDatosPronostico(datos);
      const datosPorDias = agruparPronosticoPorDias(datosTransformados);
      
      setDatosPronostico(datosTransformados);
      setPronosticoPorDias(datosPorDias);
    } catch (err) {
      setError(err.message);
      setDatosPronostico([]);
      setPronosticoPorDias([]);
    } finally {
      setCargando(false);
    }
  };

  return {
    datosPronostico,
    pronosticoPorDias,
    cargando,
    error,
    obtenerPronosticoExtendido,
    obtenerPronosticoPorUbicacion
  };
};
