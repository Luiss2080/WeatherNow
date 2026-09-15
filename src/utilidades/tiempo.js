// Formatea una antigüedad en lenguaje natural (spec 002, RF-18).
export const formatearAntiguedad = (desde, ahora = Date.now()) => {
  if (typeof desde !== 'number' || Number.isNaN(desde)) return '';

  const segundos = Math.max(0, Math.floor((ahora - desde) / 1000));
  if (segundos < 60) return 'hace menos de un minuto';

  const minutos = Math.floor(segundos / 60);
  if (minutos < 60) return `hace ${minutos} min`;

  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `hace ${horas} h`;

  const dias = Math.floor(horas / 24);
  return `hace ${dias} d`;
};
