import { ORDEN_NIVEL, obtenerActividad } from './actividades';
import { evaluarActividad } from './evaluarActividad';

const esNumero = (valor) => typeof valor === 'number' && Number.isFinite(valor);

// Condiciones de una franja del pronóstico para el motor de decisión.
export const condicionesDesdeFranja = (franja) => ({
  temperatura: franja.temperatura,
  sensacionTermica: franja.sensacionTermica,
  velocidadViento: franja.velocidadViento,
  probabilidadLluvia: franja.probabilidadLluvia
});

// Combina el clima actual con la probabilidad de lluvia de la franja más cercana
// y, si hay datos de aire, el UV y el índice de calidad del aire.
export const condicionesDesdeClima = (datosClima, pronostico = [], aire = null) => {
  const referencia = datosClima?.timestamp || 0;

  const masCercana = pronostico.reduce((mejor, franja) => {
    if (!mejor) return franja;
    return Math.abs(franja.fecha - referencia) < Math.abs(mejor.fecha - referencia)
      ? franja
      : mejor;
  }, null);

  return {
    temperatura: datosClima?.temperatura,
    sensacionTermica: datosClima?.sensacionTermica,
    velocidadViento: datosClima?.velocidadViento,
    probabilidadLluvia: masCercana ? masCercana.probabilidadLluvia : null,
    uv: aire ? aire.uv : undefined,
    aqi: aire ? aire.indiceAire : undefined
  };
};

const desviacionTermica = (condiciones, regla) => {
  if (!esNumero(condiciones.temperatura)) return Number.POSITIVE_INFINITY;
  const centro = (regla.minimaPrecaucion + regla.maximaPrecaucion) / 2;
  return Math.abs(condiciones.temperatura - centro);
};

// Devuelve la mejor franja del pronóstico para una actividad: menor gravedad y,
// a igualdad, la temperatura más cercana al rango ideal.
export const mejorFranja = (actividadId, franjas = []) => {
  const actividad = obtenerActividad(actividadId);
  if (!actividad || franjas.length === 0) return null;

  let mejor = null;

  franjas.forEach((franja, indice) => {
    const condiciones = condicionesDesdeFranja(franja);
    const veredicto = evaluarActividad(actividadId, condiciones);
    const candidato = { indice, franja, veredicto };

    if (!mejor) {
      mejor = candidato;
      return;
    }

    const diferencia = ORDEN_NIVEL[veredicto.nivel] - ORDEN_NIVEL[mejor.veredicto.nivel];
    if (diferencia < 0) {
      mejor = candidato;
    } else if (diferencia === 0) {
      const desviacionActual = desviacionTermica(condiciones, actividad.temperatura);
      const desviacionMejor = desviacionTermica(
        condicionesDesdeFranja(mejor.franja),
        actividad.temperatura
      );
      if (desviacionActual < desviacionMejor) mejor = candidato;
    }
  });

  return mejor;
};
