import { useState } from 'react';
import { leerInstantanea, guardarInstantanea } from '../almacenamiento/cacheClima';

// Guarda y recupera la última instantánea de datos para uso sin conexión.
export const useInstantanea = () => {
  const [instantanea, setInstantanea] = useState(() => leerInstantanea());

  const recordar = (datos) => {
    setInstantanea(datos);
    guardarInstantanea(datos);
  };

  return { instantanea, recordar };
};
