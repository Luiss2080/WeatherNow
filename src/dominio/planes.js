// Planes del MVP y sus límites (spec 002, RF-13/RF-17).
export const PLANES = {
  gratis: {
    id: 'gratis',
    nombre: 'Gratis',
    limiteFavoritos: 3,
    limiteAlertas: 1,
    publicidad: true
  },
  premium: {
    id: 'premium',
    nombre: 'Premium',
    limiteFavoritos: Number.MAX_SAFE_INTEGER,
    limiteAlertas: Number.MAX_SAFE_INTEGER,
    publicidad: false
  }
};

export const obtenerPlan = (id) => PLANES[id] || PLANES.gratis;
export const limiteFavoritos = (id) => obtenerPlan(id).limiteFavoritos;
export const limiteAlertas = (id) => obtenerPlan(id).limiteAlertas;
export const mostrarPublicidad = (id) => obtenerPlan(id).publicidad;
