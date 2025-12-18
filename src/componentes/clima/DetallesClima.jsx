import { 
  formatearPorcentaje, 
  formatearVelocidadViento, 
  formatearPresion,
  formatearVisibilidad 
} from '../../utilidades/formateadores';
import Tarjeta from '../comunes/Tarjeta';
import ItemDetalle from './ItemDetalle';

// Componente para mostrar detalles adicionales del clima
const DetallesClima = ({ datosClima }) => {
  if (!datosClima) return null;
  
  return (
    <Tarjeta titulo="Detalles">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <ItemDetalle 
          icono="💧" 
          etiqueta="Humedad" 
          valor={formatearPorcentaje(datosClima.humedad)} 
        />
        <ItemDetalle 
          icono="💨" 
          etiqueta="Viento" 
          valor={formatearVelocidadViento(datosClima.velocidadViento)} 
        />
        <ItemDetalle 
          icono="🌡️" 
          etiqueta="Presión" 
          valor={formatearPresion(datosClima.presion)} 
        />
        <ItemDetalle 
          icono="👁️" 
          etiqueta="Visibilidad" 
          valor={formatearVisibilidad(datosClima.visibilidad)} 
        />
        <ItemDetalle 
          icono="🌡️" 
          etiqueta="Mín/Máx" 
          valor={`${formatearTemperatura(datosClima.temperaturaMinima)} / ${formatearTemperatura(datosClima.temperaturaMaxima)}`} 
        />
      </div>
    </Tarjeta>
  );
};

export default DetallesClima;
