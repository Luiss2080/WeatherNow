import { formatearHora } from '../../utilidades/formateadores';
import Tarjeta from '../comunes/Tarjeta';

// Componente para mostrar información de amanecer y atardecer
const InfoSolarPrincipal = ({ datosClima }) => {
  if (!datosClima) return null;

  return (
    <Tarjeta titulo="Información Solar">
      <div className="grid grid-cols-2 gap-6">
        <div className="text-center">
          <div className="text-5xl mb-2">🌅</div>
          <p className="text-sm text-gray-600 mb-1">Amanecer</p>
          <p className="text-2xl font-bold text-gray-800">
            {formatearHora(datosClima.amanecer, datosClima.zonaHoraria)}
          </p>
        </div>
        <div className="text-center">
          <div className="text-5xl mb-2">🌇</div>
          <p className="text-sm text-gray-600 mb-1">Atardecer</p>
          <p className="text-2xl font-bold text-gray-800">
            {formatearHora(datosClima.atardecer, datosClima.zonaHoraria)}
          </p>
        </div>
      </div>
    </Tarjeta>
  );
};

export default InfoSolarPrincipal;
