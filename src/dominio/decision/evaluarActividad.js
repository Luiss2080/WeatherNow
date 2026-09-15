import {
  ACTIVIDADES,
  NIVELES,
  ORDEN_NIVEL,
  ETIQUETAS_NIVEL,
  obtenerActividad
} from './actividades';

const esNumero = (valor) => typeof valor === 'number' && Number.isFinite(valor);

const evaluarTemperatura = (valor, regla, etiqueta) => {
  if (!esNumero(valor)) return { ausente: etiqueta };
  if (valor < regla.minima || valor > regla.maxima) {
    return {
      nivel: NIVELES.NO_RECOMENDADO,
      motivo: `Temperatura extrema (${Math.round(valor)}°)`
    };
  }
  if (valor < regla.minimaPrecaucion || valor > regla.maximaPrecaucion) {
    return {
      nivel: NIVELES.PRECAUCION,
      motivo: `Temperatura poco cómoda (${Math.round(valor)}°)`
    };
  }
  return { nivel: NIVELES.FAVORABLE };
};

const evaluarViento = (valor, regla, etiqueta) => {
  if (!esNumero(valor)) return { ausente: etiqueta };
  if (valor > regla.noRecomendado) {
    return { nivel: NIVELES.NO_RECOMENDADO, motivo: `Viento fuerte (${Math.round(valor)} km/h)` };
  }
  if (valor > regla.precaucion) {
    return { nivel: NIVELES.PRECAUCION, motivo: `Viento moderado (${Math.round(valor)} km/h)` };
  }
  return { nivel: NIVELES.FAVORABLE };
};

const evaluarLluvia = (valor, regla, etiqueta) => {
  // null = dato solicitado y ausente; undefined = no aplica.
  if (valor === null) return { ausente: etiqueta };
  if (!esNumero(valor)) return { nivel: NIVELES.FAVORABLE };
  if (valor >= regla.noRecomendado) {
    return {
      nivel: NIVELES.NO_RECOMENDADO,
      motivo: `Lluvia muy probable (${Math.round(valor)}%)`
    };
  }
  if (valor >= regla.precaucion) {
    return { nivel: NIVELES.PRECAUCION, motivo: `Posible lluvia (${Math.round(valor)}%)` };
  }
  return { nivel: NIVELES.FAVORABLE };
};

const evaluarIndice = (valor, regla, etiqueta, descripcion) => {
  if (!regla) return { omitido: true };
  if (valor === null) return { ausente: etiqueta };
  if (!esNumero(valor)) return { nivel: NIVELES.FAVORABLE };
  if (valor >= regla.noRecomendado) {
    return {
      nivel: NIVELES.NO_RECOMENDADO,
      motivo: `${descripcion} muy alto (${Math.round(valor)})`
    };
  }
  if (valor >= regla.precaucion) {
    return { nivel: NIVELES.PRECAUCION, motivo: `${descripcion} alto (${Math.round(valor)})` };
  }
  return { nivel: NIVELES.FAVORABLE };
};

// Evalúa una actividad con las condiciones dadas. El nivel final es el peor de
// sus variables; `datosAusentes` recoge lo que se solicitó y no llegó.
export const evaluarActividad = (actividadId, condiciones = {}) => {
  const actividad = obtenerActividad(actividadId);
  if (!actividad) return null;

  const evaluaciones = [
    evaluarTemperatura(
      condiciones.sensacionTermica ?? condiciones.temperatura,
      actividad.temperatura,
      'sensación térmica'
    ),
    evaluarViento(condiciones.velocidadViento, actividad.viento, 'viento'),
    evaluarLluvia(condiciones.probabilidadLluvia, actividad.lluvia, 'lluvia'),
    evaluarIndice(condiciones.uv, actividad.uv, 'uv', 'Índice UV'),
    evaluarIndice(condiciones.aqi, actividad.aqi, 'aqi', 'Calidad del aire')
  ];

  const validas = evaluaciones.filter((evaluacion) => evaluacion.nivel);
  const datosAusentes = evaluaciones.filter((evaluacion) => evaluacion.ausente).map((e) => e.ausente);

  if (validas.length === 0) {
    return {
      actividad: actividad.id,
      nombre: actividad.nombre,
      icono: actividad.icono,
      nivel: NIVELES.PRECAUCION,
      etiquetaNivel: ETIQUETAS_NIVEL[NIVELES.PRECAUCION],
      motivo: 'Sin datos suficientes para evaluar',
      motivos: [],
      datosAusentes
    };
  }

  const peor = validas.reduce(
    (actual, evaluacion) =>
      ORDEN_NIVEL[evaluacion.nivel] > ORDEN_NIVEL[actual.nivel] ? evaluacion : actual,
    { nivel: NIVELES.FAVORABLE }
  );

  const motivos = validas
    .filter((evaluacion) => evaluacion.nivel === peor.nivel && evaluacion.motivo)
    .map((evaluacion) => evaluacion.motivo);

  return {
    actividad: actividad.id,
    nombre: actividad.nombre,
    icono: actividad.icono,
    nivel: peor.nivel,
    etiquetaNivel: ETIQUETAS_NIVEL[peor.nivel],
    motivo:
      motivos[0] ||
      (peor.nivel === NIVELES.FAVORABLE
        ? `Buenas condiciones para ${actividad.nombre.toLowerCase()}`
        : 'Condiciones limitadas'),
    motivos,
    datosAusentes
  };
};

export const evaluarTodas = (condiciones) =>
  ACTIVIDADES.map((actividad) => evaluarActividad(actividad.id, condiciones));
