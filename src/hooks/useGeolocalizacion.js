import { useState } from 'react';
import { obtenerUbicacionActual } from '../servicios/servicioGeolocalizacion';

// Hook para manejar la geolocalización
export const useGeolocalizacion = () => {
  const [ubicacion, setUbicacion] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const obtenerUbicacion = async () => {
    setCargando(true);
    setError(null);

    try {
      const coords = await obtenerUbicacionActual();
      setUbicacion(coords);
      return coords;
    } catch (err) {
      setError(err.message);
      setUbicacion(null);
      return null;
    } finally {
      setCargando(false);
    }
  };

  return {
    ubicacion,
    cargando,
    error,
    obtenerUbicacion
  };
};
