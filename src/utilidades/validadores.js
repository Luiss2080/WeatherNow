// Validar si el nombre de ciudad es válido
export const validarNombreCiudad = (nombre) => {
  if (!nombre || nombre.trim().length === 0) {
    return { valido: false, mensaje: 'El nombre de la ciudad no puede estar vacío' };
  }
  
  if (nombre.trim().length < 2) {
    return { valido: false, mensaje: 'El nombre debe tener al menos 2 caracteres' };
  }
  
  return { valido: true };
};

// Validar coordenadas
export const validarCoordenadas = (latitud, longitud) => {
  if (latitud < -90 || latitud > 90) {
    return { valido: false, mensaje: 'Latitud inválida' };
  }
  
  if (longitud < -180 || longitud > 180) {
    return { valido: false, mensaje: 'Longitud inválida' };
  }
  
  return { valido: true };
};
