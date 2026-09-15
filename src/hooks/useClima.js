import { useState, useEffect, useRef } from 'react';
import { obtenerClimaPorCiudad, obtenerClimaPorCoordenadas } from '../servicios/servicioClima';
import { transformarDatosClima } from '../utilidades/transformadores';

// Hook personalizado para manejar datos del clima.
// Cancela y descarta peticiones obsoletas al cambiar de consulta.
export const useClima = (ciudadInicial = '') => {
  const [datosClima, setDatosClima] = useState(null);
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
      setDatosClima(transformarDatosClima(datos));
    } catch (err) {
      if (id !== peticionRef.current || err?.name === 'CanceledError') return;
      setError(err.message);
      setDatosClima(null);
    } finally {
      if (id === peticionRef.current) setCargando(false);
    }
  };

  const obtenerClima = (ciudad) =>
    consultar((signal) => obtenerClimaPorCiudad(ciudad, signal));

  const obtenerClimaPorUbicacion = (latitud, longitud) =>
    consultar((signal) => obtenerClimaPorCoordenadas(latitud, longitud, signal));

  useEffect(() => {
    if (ciudadInicial) {
      obtenerClima(ciudadInicial);
    }
    // Solo debe reaccionar a la ciudad inicial.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ciudadInicial]);

  useEffect(() => () => abortRef.current?.abort(), []);

  return {
    datosClima,
    cargando,
    error,
    obtenerClima,
    obtenerClimaPorUbicacion
  };
};
