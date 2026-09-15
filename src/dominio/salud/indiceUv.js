// Niveles del índice UV y recomendaciones de protección.
export const NIVELES_UV = [
  { max: 2, nivel: 'bajo', etiqueta: 'Bajo', proteccion: 'No necesitas protección especial.' },
  {
    max: 5,
    nivel: 'moderado',
    etiqueta: 'Moderado',
    proteccion: 'Usa gafas de sol y protector solar si estarás al sol.'
  },
  {
    max: 7,
    nivel: 'alto',
    etiqueta: 'Alto',
    proteccion: 'Protector solar, sombrero y busca la sombra al mediodía.'
  },
  {
    max: 10,
    nivel: 'muy_alto',
    etiqueta: 'Muy alto',
    proteccion: 'Evita el sol entre las 10 y las 16 h; usa protección completa.'
  },
  {
    max: Number.POSITIVE_INFINITY,
    nivel: 'extremo',
    etiqueta: 'Extremo',
    proteccion: 'Evita la exposición al sol; protección máxima.'
  }
];

export const nivelUv = (uv) => {
  if (typeof uv !== 'number' || Number.isNaN(uv)) return null;
  return NIVELES_UV.find((nivel) => uv <= nivel.max) || null;
};

const NIVELES_CON_PROTECCION = ['alto', 'muy_alto', 'extremo'];

// RF-5: solo se recomienda protección a partir del nivel alto.
export const recomendacionUv = (uv) => {
  const nivel = nivelUv(uv);
  if (!nivel || !NIVELES_CON_PROTECCION.includes(nivel.nivel)) return null;
  return nivel.proteccion;
};
