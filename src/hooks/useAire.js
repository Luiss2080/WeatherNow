import { useState, useEffect, useRef } from 'react';
import { obtenerAire } from '../servicios/servicioAire';

// Hook para la calidad del aire, UV y polen. Descarta peticiones obsoletas.
export const useAire = () => {
  const [datosAire, setDatosAire] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const peticionRef = useRef(0);
  const abortRef = useRef(null);

  const cargarAire = async (latitud, longitud) => {
    const id = peticionRef.current + 1;
    peticionRef.current = id;
    abortRef.current?.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    setCargando(true);
    setError(null);

    try {
      const datos = await obtenerAire(latitud, longitud, controller.signal);
      if (id !== peticionRef.current) return;
      setDatosAire(datos);
    } catch (err) {
      if (id !== peticionRef.current || err?.name === 'CanceledError') return;
      setError(err.message);
      setDatosAire(null);
    } finally {
      if (id === peticionRef.current) setCargando(false);
    }
  };

  useEffect(() => () => abortRef.current?.abort(), []);

  return { datosAire, cargando, error, cargarAire };
};
