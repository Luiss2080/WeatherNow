import { formatearFechaCorta, formatearTemperatura } from '../../utilidades/formateadores';
import { obtenerIconoClima } from '../../constantes/iconosClima';

// Componente para mostrar una tarjeta de pronóstico diario
const TarjetaPronosticoDiario = ({ datos }) => {
  const iconoInfo = obtenerIconoClima(datos.items[0]?.icono || '01d');

  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow">
      <p className="text-sm text-gray-600 mb-2">
        {formatearFechaCorta(datos.fecha, datos.zonaHoraria)}
      </p>
      <div className="text-5xl mb-3">{iconoInfo.icono}</div>
      <div className="space-y-1">
        <p className="text-lg font-bold text-gray-800">
          {formatearTemperatura(datos.temperaturaMax)}
        </p>
        <p className="text-sm text-gray-600">{formatearTemperatura(datos.temperaturaMin)}</p>
      </div>
    </div>
  );
};

export default TarjetaPronosticoDiario;
