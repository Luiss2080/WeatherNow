import { useState } from 'react';
import {
  leerFavoritos,
  guardarFavoritos,
  agregarFavorito,
  eliminarFavorito,
  reordenarFavoritos,
  LIMITE_FAVORITOS_GRATIS
} from '../almacenamiento/favoritos';

// Favoritos persistidos en localStorage, con el límite del plan.
export const useFavoritos = (limite = LIMITE_FAVORITOS_GRATIS) => {
  const [favoritos, setFavoritos] = useState(() => leerFavoritos().slice(0, limite));

  const actualizar = (siguiente) => {
    setFavoritos(siguiente);
    guardarFavoritos(siguiente);
    return siguiente;
  };

  const agregar = (lugar) => actualizar(agregarFavorito(favoritos, lugar, limite));
  const eliminar = (id) => actualizar(eliminarFavorito(favoritos, id));
  const reordenar = (desde, hasta) => actualizar(reordenarFavoritos(favoritos, desde, hasta));

  return { favoritos, agregar, eliminar, reordenar };
};
