// Categorías del índice de calidad del aire (US AQI) y avisos por sensibilidad.
export const CATEGORIAS_AIRE = [
  { max: 50, nivel: 'buena', etiqueta: 'Buena', aviso: null },
  {
    max: 100,
    nivel: 'moderada',
    etiqueta: 'Moderada',
    aviso: 'Aceptable para la mayoría; los grupos sensibles deberían vigilar síntomas.'
  },
  {
    max: 150,
    nivel: 'danina_sensibles',
    etiqueta: 'Dañina para grupos sensibles',
    aviso: 'Asma, alergias, niños y mayores deberían limitar el esfuerzo al aire libre.'
  },
  {
    max: 200,
    nivel: 'danina',
    etiqueta: 'Dañina',
    aviso: 'Evita el esfuerzo prolongado al aire libre.'
  },
  {
    max: 300,
    nivel: 'muy_danina',
    etiqueta: 'Muy dañina',
    aviso: 'Evita las actividades al aire libre.'
  },
  {
    max: Number.POSITIVE_INFINITY,
    nivel: 'peligrosa',
    etiqueta: 'Peligrosa',
    aviso: 'Permanece en interiores.'
  }
];

export const categoriaAire = (aqi) => {
  if (typeof aqi !== 'number' || Number.isNaN(aqi)) return null;
  return CATEGORIAS_AIRE.find((categoria) => aqi <= categoria.max) || null;
};

const NIVELES_CON_AVISO = ['danina_sensibles', 'danina', 'muy_danina', 'peligrosa'];

export const avisoGruposSensibles = (aqi) => {
  const categoria = categoriaAire(aqi);
  if (!categoria || !NIVELES_CON_AVISO.includes(categoria.nivel)) return null;
  return categoria.aviso;
};
