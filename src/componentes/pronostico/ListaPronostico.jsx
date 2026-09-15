import Tarjeta from '../comunes/Tarjeta';
import TarjetaPronosticoDiario from './TarjetaPronosticoDiario';
import { UNIDADES } from '../../utilidades/formateadores';

// Componente para mostrar lista de pronóstico por días
const ListaPronostico = ({ pronosticoPorDias, unidades = UNIDADES.METRICO }) => {
  if (!pronosticoPorDias || pronosticoPorDias.length === 0) return null;

  return (
    <Tarjeta titulo="📅 Pronóstico de 5 días">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {pronosticoPorDias.slice(0, 5).map((dia) => (
          <TarjetaPronosticoDiario key={dia.diaClave} datos={dia} unidades={unidades} />
        ))}
      </div>
    </Tarjeta>
  );
};

export default ListaPronostico;
