// Caché en memoria con TTL. El reloj se inyecta para poder testear.
export const crearCache = ({ ahora = () => Date.now() } = {}) => {
  const entradas = new Map();

  const obtener = (clave) => {
    const entrada = entradas.get(clave);
    if (!entrada) return { acertado: false };
    if (entrada.expiraEn <= ahora()) {
      entradas.delete(clave);
      return { acertado: false };
    }
    return { acertado: true, valor: entrada.valor };
  };

  const guardar = (clave, valor, ttlMs) => {
    entradas.set(clave, { valor, expiraEn: ahora() + ttlMs });
    return valor;
  };

  const tamano = () => entradas.size;
  const limpiar = () => entradas.clear();

  return { obtener, guardar, tamano, limpiar };
};
