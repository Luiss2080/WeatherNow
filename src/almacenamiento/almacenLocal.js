const obtenerAlmacen = () => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export const leer = (clave, porDefecto) => {
  const almacen = obtenerAlmacen();
  if (!almacen) return porDefecto;
  try {
    const bruto = almacen.getItem(clave);
    return bruto === null ? porDefecto : JSON.parse(bruto);
  } catch {
    return porDefecto;
  }
};

export const escribir = (clave, valor) => {
  const almacen = obtenerAlmacen();
  if (!almacen) return false;
  try {
    almacen.setItem(clave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
};

export const eliminar = (clave) => {
  const almacen = obtenerAlmacen();
  if (!almacen) return false;
  try {
    almacen.removeItem(clave);
    return true;
  } catch {
    return false;
  }
};
