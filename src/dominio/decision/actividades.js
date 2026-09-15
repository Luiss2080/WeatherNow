// Catálogo de actividades y umbrales del motor de decisión (spec 002, Fase B).
// Unidades: temperatura °C, viento km/h, lluvia %, UV/AQI en índice.

export const NIVELES = {
  FAVORABLE: 'favorable',
  PRECAUCION: 'precaucion',
  NO_RECOMENDADO: 'no_recomendado'
};

export const ORDEN_NIVEL = {
  [NIVELES.FAVORABLE]: 0,
  [NIVELES.PRECAUCION]: 1,
  [NIVELES.NO_RECOMENDADO]: 2
};

export const ETIQUETAS_NIVEL = {
  [NIVELES.FAVORABLE]: 'Favorable',
  [NIVELES.PRECAUCION]: 'Precaución',
  [NIVELES.NO_RECOMENDADO]: 'No recomendado'
};

export const ACTIVIDADES = [
  {
    id: 'correr',
    nombre: 'Correr',
    icono: '🏃',
    temperatura: { minima: -2, maxima: 30, minimaPrecaucion: 5, maximaPrecaucion: 24 },
    viento: { precaucion: 30, noRecomendado: 45 },
    lluvia: { precaucion: 40, noRecomendado: 70 },
    uv: { precaucion: 6, noRecomendado: 9 }
  },
  {
    id: 'ciclismo',
    nombre: 'Ciclismo',
    icono: '🚴',
    temperatura: { minima: 0, maxima: 32, minimaPrecaucion: 8, maximaPrecaucion: 26 },
    viento: { precaucion: 25, noRecomendado: 40 },
    lluvia: { precaucion: 30, noRecomendado: 60 },
    uv: { precaucion: 6, noRecomendado: 9 }
  },
  {
    id: 'caminar',
    nombre: 'Caminar',
    icono: '🚶',
    temperatura: { minima: -5, maxima: 35, minimaPrecaucion: 4, maximaPrecaucion: 30 },
    viento: { precaucion: 35, noRecomendado: 55 },
    lluvia: { precaucion: 50, noRecomendado: 80 },
    uv: { precaucion: 7, noRecomendado: 10 }
  },
  {
    id: 'evento',
    nombre: 'Evento al aire libre',
    icono: '🎉',
    temperatura: { minima: 5, maxima: 34, minimaPrecaucion: 12, maximaPrecaucion: 28 },
    viento: { precaucion: 25, noRecomendado: 40 },
    lluvia: { precaucion: 30, noRecomendado: 60 },
    uv: { precaucion: 7, noRecomendado: 10 }
  },
  {
    id: 'ropa',
    nombre: 'Tender la ropa',
    icono: '🧺',
    temperatura: { minima: 5, maxima: 40, minimaPrecaucion: 12, maximaPrecaucion: 34 },
    viento: { precaucion: 40, noRecomendado: 60 },
    lluvia: { precaucion: 30, noRecomendado: 55 },
    uv: null
  },
  {
    id: 'lavarAuto',
    nombre: 'Lavar el auto',
    icono: '🚗',
    temperatura: { minima: 0, maxima: 40, minimaPrecaucion: 8, maximaPrecaucion: 35 },
    viento: { precaucion: 35, noRecomendado: 55 },
    lluvia: { precaucion: 30, noRecomendado: 55 },
    uv: null
  }
];

export const obtenerActividad = (id) =>
  ACTIVIDADES.find((actividad) => actividad.id === id) || null;
