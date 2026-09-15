import { condicionesDesdeFranja } from '../decision/franjas';
import { obtenerTipoAlerta } from './condiciones';

// Comprueba si una alerta se cumple en el horizonte del pronóstico.
// UV y AQI solo se conocen en el momento actual (aire), no por franja.
export const evaluarAlerta = (alerta, { franjas = [], aire = null } = {}) => {
  if (!alerta || alerta.activa === false) return { cumplida: false };

  const tipo = obtenerTipoAlerta(alerta.condicion);
  if (!tipo) return { cumplida: false };

  for (let indice = 0; indice < franjas.length; indice += 1) {
    const condiciones = condicionesDesdeFranja(franjas[indice]);
    condiciones.uv = aire ? aire.uv : undefined;
    condiciones.aqi = aire ? aire.indiceAire : undefined;

    if (tipo.evaluar(condiciones, alerta.umbral)) {
      return { cumplida: true, indice, franja: franjas[indice] };
    }
  }

  return { cumplida: false };
};
