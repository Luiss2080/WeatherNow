import { useState } from 'react';
import { leerUltimoLugar, guardarUltimoLugar } from '../almacenamiento/ultimoLugar';

// Último lugar consultado, para autocargarlo al abrir la app.
export const useUltimoLugar = () => {
  const [ultimoLugar, setUltimoLugar] = useState(() => leerUltimoLugar());

  const recordar = (lugar) => {
    if (guardarUltimoLugar(lugar)) setUltimoLugar(lugar);
  };

  return { ultimoLugar, recordar };
};
