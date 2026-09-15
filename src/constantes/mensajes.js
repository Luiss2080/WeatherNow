// Mensajes y etiquetas de la aplicación
export const MENSAJES = {
  ERROR_UBICACION: 'No se pudo obtener tu ubicación. Por favor, permite el acceso a la ubicación.',
  ERROR_API: 'Error al obtener los datos del clima. Inténtalo de nuevo.',
  ERROR_CIUDAD_NO_ENCONTRADA: 'No se encontró la ciudad. Verifica el nombre e inténtalo de nuevo.',
  CARGANDO: 'Cargando datos del clima...',
  BUSCAR_CIUDAD: 'Buscar ciudad...',
  SIN_DATOS: 'No hay datos disponibles'
};

export const ETIQUETAS = {
  TEMPERATURA: 'Temperatura',
  SENSACION_TERMICA: 'Sensación térmica',
  HUMEDAD: 'Humedad',
  VELOCIDAD_VIENTO: 'Velocidad del viento',
  PRESION: 'Presión',
  VISIBILIDAD: 'Visibilidad',
  AMANECER: 'Amanecer',
  ATARDECER: 'Atardecer'
};

// Códigos de error para traducir respuestas del proveedor sin perder la causa
export const CODIGOS_ERROR = {
  CIUDAD_NO_ENCONTRADA: 'CIUDAD_NO_ENCONTRADA',
  CONFIGURACION: 'CONFIGURACION',
  LIMITE: 'LIMITE',
  RED: 'RED',
  DESCONOCIDO: 'DESCONOCIDO'
};

export const MENSAJES_ERROR = {
  [CODIGOS_ERROR.CIUDAD_NO_ENCONTRADA]:
    'No encontramos esa ciudad. Revisa el nombre e inténtalo de nuevo.',
  [CODIGOS_ERROR.CONFIGURACION]:
    'La API key no es válida o falta. Revisa la configuración.',
  [CODIGOS_ERROR.LIMITE]:
    'Se superó el límite de peticiones. Espera un momento e inténtalo de nuevo.',
  [CODIGOS_ERROR.RED]:
    'No hay conexión con el servicio del clima. Revisa tu conexión.',
  [CODIGOS_ERROR.DESCONOCIDO]:
    'No se pudo obtener el clima. Inténtalo de nuevo.'
};

export const mensajeDesdeError = (error) =>
  MENSAJES_ERROR[error?.codigo] ||
  error?.message ||
  MENSAJES_ERROR[CODIGOS_ERROR.DESCONOCIDO];
