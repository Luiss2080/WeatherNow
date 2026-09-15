import { useState } from 'react';
import {
  leerFavoritos,
  guardarFavoritos,
  agregarFavorito,
  eliminarFavorito,
  reordenarFavoritos
} from '../almacenamiento/favoritos';

// Favoritos persistidos en localStorage.
export const useFavoritos = () => {
  const [favoritos, setFavoritos] = useState(() => leerFavoritos());

  const actualizar = (siguiente) => {
    setFavoritos(siguiente);
    guardarFavoritos(siguiente);
    return siguiente;
  };

  const agregar = (lugar) => actualizar(agregarFavorito(favoritos, lugar));
  const eliminar = (id) => actualizar(eliminarFavorito(favoritos, id));
  const reordenar = (desde, hasta) => actualizar(reordenarFavoritos(favoritos, desde, hasta));

  return { favoritos, agregar, eliminar, reordenar };
};
