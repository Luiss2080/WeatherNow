// Catálogo de condiciones que pueden disparar una alerta (spec 002, RF-12).
const esNumero = (valor) => typeof valor === 'number' && Number.isFinite(valor);

export const TIPOS_ALERTA = {
  lluvia: {
    id: 'lluvia',
    nombre: 'Lluvia',
    unidad: '%',
    minimo: 0,
    maximo: 100,
    umbralPorDefecto: 50,
    descripcion: (umbral) => `Lluvia probable ≥ ${umbral}%`,
    evaluar: (condiciones, umbral) =>
      esNumero(condiciones.probabilidadLluvia) && condiciones.probabilidadLluvia >= umbral
  },
  viento: {
    id: 'viento',
    nombre: 'Viento',
    unidad: 'km/h',
    minimo: 0,
    maximo: 150,
    umbralPorDefecto: 40,
    descripcion: (umbral) => `Viento ≥ ${umbral} km/h`,
    evaluar: (condiciones, umbral) =>
      esNumero(condiciones.velocidadViento) && condiciones.velocidadViento >= umbral
  },
  uv: {
    id: 'uv',
    nombre: 'UV alto',
    unidad: 'índice',
    minimo: 0,
    maximo: 12,
    umbralPorDefecto: 6,
    descripcion: (umbral) => `Índice UV ≥ ${umbral}`,
    evaluar: (condiciones, umbral) => esNumero(condiciones.uv) && condiciones.uv >= umbral
  },
  calor: {
    id: 'calor',
    nombre: 'Calor',
    unidad: '°C',
    minimo: 0,
    maximo: 50,
    umbralPorDefecto: 30,
    descripcion: (umbral) => `Temperatura ≥ ${umbral} °C`,
    evaluar: (condiciones, umbral) =>
      esNumero(condiciones.temperatura) && condiciones.temperatura >= umbral
  },
  frio: {
    id: 'frio',
    nombre: 'Frío',
    unidad: '°C',
    minimo: -20,
    maximo: 20,
    umbralPorDefecto: 2,
    descripcion: (umbral) => `Temperatura ≤ ${umbral} °C`,
    evaluar: (condiciones, umbral) =>
      esNumero(condiciones.temperatura) && condiciones.temperatura <= umbral
  }
};

export const obtenerTipoAlerta = (id) => TIPOS_ALERTA[id] || null;
