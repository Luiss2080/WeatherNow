import Tarjeta from '../comunes/Tarjeta';
import { nivelUv, recomendacionUv } from '../../dominio/salud/indiceUv';
import { categoriaAire, avisoGruposSensibles } from '../../dominio/salud/calidadAire';

const formatearNumero = (valor) => (typeof valor === 'number' ? Math.round(valor) : null);

const Bloque = ({ titulo, valor, etiqueta, aviso, tono }) => (
  <div className={`rounded-lg border p-4 ${tono || 'border-gray-200 bg-gray-50'}`}>
    <h4 className="font-bold text-gray-800">{titulo}</h4>
    <p className="mt-1 text-sm text-gray-600">{valor}</p>
    {etiqueta && <p className="mt-1 text-xs font-semibold text-gray-700">{etiqueta}</p>}
    {aviso && (
      <p className="mt-2 text-sm text-amber-800" role="status">
        {aviso}
      </p>
    )}
  </div>
);

// Panel de salud: índice UV, calidad del aire y polen (spec 002, Fase D).
const PanelSalud = ({ aire }) => {
  if (!aire) return null;

  const indiceAire = formatearNumero(aire.indiceAire);
  const uv = formatearNumero(aire.uv);
  const nivelUltravioleta = nivelUv(aire.uv);
  const proteccion = recomendacionUv(aire.uv);
  const categoria = categoriaAire(aire.indiceAire);
  const avisoAire = avisoGruposSensibles(aire.indiceAire);

  const polen = aire.polen || {};
  const polenAlto = Object.values(polen).some((valor) => typeof valor === 'number' && valor >= 3);

  return (
    <Tarjeta titulo="🌞 Salud y aire">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Bloque
          titulo="Índice UV"
          valor={uv === null ? 'Sin datos de UV' : `Nivel ${uv}`}
          etiqueta={nivelUltravioleta ? `Riesgo ${nivelUltravioleta.etiqueta.toLowerCase()}` : null}
          aviso={proteccion}
          tono={
            nivelUltravioleta && ['alto', 'muy_alto', 'extremo'].includes(nivelUltravioleta.nivel)
              ? 'border-amber-300 bg-amber-50'
              : 'border-gray-200 bg-gray-50'
          }
        />
        <Bloque
          titulo="Calidad del aire"
          valor={indiceAire === null ? 'Sin datos de calidad del aire' : `AQI ${indiceAire}`}
          etiqueta={categoria ? categoria.etiqueta : null}
          aviso={avisoAire}
          tono={avisoAire ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'}
        />
        <Bloque
          titulo="Polen"
          valor={polenAlto ? 'Niveles altos de polen' : 'Niveles de polen normales'}
          etiqueta={polenAlto ? 'Puede afectar a personas alérgicas' : null}
        />
      </div>
    </Tarjeta>
  );
};

export default PanelSalud;
