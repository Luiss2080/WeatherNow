import { obtenerIconoClima } from '../../constantes/iconosClima';
import { formatearTemperatura } from '../../utilidades/formateadores';
import Tarjeta from '../comunes/Tarjeta';

// Componente para mostrar la información principal del clima
const TarjetaClimaPrincipal = ({ datosClima }) => {
  if (!datosClima) return null;

  const iconoInfo = obtenerIconoClima(datosClima.icono);

  return (
    <Tarjeta sombraGrande claseAdicional="text-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-gray-800">
          {datosClima.ciudad}
          {datosClima.pais && <span className="text-gray-600">, {datosClima.pais}</span>}
        </h2>
      </div>

      <div className="text-8xl mb-4">{iconoInfo.icono}</div>

      <div className="mb-2">
        <div className="text-6xl font-bold text-gray-800">
          {formatearTemperatura(datosClima.temperatura)}
        </div>
        <p className="text-xl text-gray-600 capitalize mt-2">{datosClima.descripcion}</p>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>Sensación térmica: {formatearTemperatura(datosClima.sensacionTermica)}</p>
      </div>
    </Tarjeta>
  );
};

export default TarjetaClimaPrincipal;
