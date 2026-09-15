import Tarjeta from '../comunes/Tarjeta';
import TarjetaActividad from './TarjetaActividad';
import { evaluarTodas } from '../../dominio/decision/evaluarActividad';
import { mejorFranja } from '../../dominio/decision/franjas';

// Panel que traduce las condiciones actuales en decisiones por actividad.
const PanelDecisiones = ({ condiciones, franjas = [] }) => {
  if (!condiciones) return null;

  const resultados = evaluarTodas(condiciones);

  return (
    <Tarjeta titulo="🧭 ¿Puedo hacerlo hoy?">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resultados.map((resultado) => (
          <TarjetaActividad
            key={resultado.actividad}
            resultado={resultado}
            mejorFranja={mejorFranja(resultado.actividad, franjas)}
          />
        ))}
      </div>
    </Tarjeta>
  );
};

export default PanelDecisiones;
