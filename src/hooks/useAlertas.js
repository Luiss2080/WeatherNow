import { useState } from 'react';
import { leerAlertas, guardarAlertas, LIMITE_ALERTAS_GRATIS } from '../almacenamiento/alertas';

// Alertas persistidas en localStorage, con el límite del plan.
export const useAlertas = (limite = LIMITE_ALERTAS_GRATIS) => {
  const [alertas, setAlertas] = useState(() => leerAlertas());

  const actualizar = (siguiente) => {
    setAlertas(siguiente);
    guardarAlertas(siguiente);
    return siguiente;
  };

  const agregar = ({ lugarId, lugarNombre, condicion, umbral }) => {
    const id = `${lugarId}:${condicion}`;
    if (alertas.some((alerta) => alerta.id === id)) return { agregada: false, motivo: 'duplicada' };
    if (alertas.length >= limite) return { agregada: false, motivo: 'limite' };

    actualizar([
      ...alertas,
      {
        id,
        lugarId,
        lugarNombre: lugarNombre || '',
        condicion,
        umbral,
        activa: true,
        creadaEn: Date.now()
      }
    ]);
    return { agregada: true };
  };

  const eliminar = (id) => actualizar(alertas.filter((alerta) => alerta.id !== id));
  const alternar = (id) =>
    actualizar(
      alertas.map((alerta) => (alerta.id === id ? { ...alerta, activa: !alerta.activa } : alerta))
    );

  return { alertas, agregar, eliminar, alternar };
};
