import { useState } from 'react';
import { leerPreferencias, guardarPreferencias } from '../almacenamiento/preferencias';

// Preferencias del usuario persistidas en localStorage.
export const usePreferencias = () => {
  const [preferencias, setPreferencias] = useState(() => leerPreferencias());

  const cambiarUnidades = (unidades) =>
    setPreferencias((previas) => {
      const siguientes = { ...previas, unidades };
      guardarPreferencias(siguientes);
      return siguientes;
    });

  return { preferencias, cambiarUnidades };
};
