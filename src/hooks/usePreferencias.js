import { useState } from 'react';
import { leerPreferencias, guardarPreferencias } from '../almacenamiento/preferencias';

// Preferencias del usuario persistidas en localStorage.
export const usePreferencias = () => {
  const [preferencias, setPreferencias] = useState(() => leerPreferencias());

  const actualizar = (cambios) =>
    setPreferencias((previas) => {
      const siguientes = { ...previas, ...cambios };
      guardarPreferencias(siguientes);
      return siguientes;
    });

  const cambiarUnidades = (unidades) => actualizar({ unidades });
  const cambiarPlan = (plan) => actualizar({ plan });

  return { preferencias, cambiarUnidades, cambiarPlan };
};
