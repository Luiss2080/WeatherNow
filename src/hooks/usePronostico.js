import { useState, useEffect, useRef } from 'react';
import { obtenerPronostico, obtenerPronosticoPorCoordenadas } from '../servicios/servicioClima';
import {
  transformarDatosPronostico,
  agruparPronosticoPorDias
} from '../utilidades/transformadores';

// Hook para manejar el pronóstico del clima.
// Cancela y descarta peticiones obsoletas al cambiar de consulta.
export const usePronostico = () => {
  const [datosPronostico, setDatosPronostico] = useState([]);
  const [pronosticoPorDias, setPronosticoPorDias] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const peticionRef = useRef(0);
  const abortRef = useRef(null);

  const consultar = async (solicitar) => {
    const id = peticionRef.current + 1;
    peticionRef.current = id;
    abortRef.current?.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    setCargando(true);
    setError(null);

    try {
      const datos = await solicitar(controller.signal);
      if (id !== peticionRef.current) return;
      const datosTransformados = transformarDatosPronostico(datos);
      setDatosPronostico(datosTransformados);
      setPronosticoPorDias(agruparPronosticoPorDias(datosTransformados));
    } catch (err) {
      if (id !== peticionRef.current || err?.name === 'CanceledError') return;
      setError(err.message);
      setDatosPronostico([]);
      setPronosticoPorDias([]);
    } finally {
      if (id === peticionRef.current) setCargando(false);
    }
  };

  const obtenerPronosticoExtendido = (ciudad) =>
    consultar((signal) => obtenerPronostico(ciudad, signal));

  const obtenerPronosticoPorUbicacion = (latitud, longitud) =>
    consultar((signal) => obtenerPronosticoPorCoordenadas(latitud, longitud, signal));

  useEffect(() => () => abortRef.current?.abort(), []);

  return {
    datosPronostico,
    pronosticoPorDias,
    cargando,
    error,
    obtenerPronosticoExtendido,
    obtenerPronosticoPorUbicacion
  };
};
