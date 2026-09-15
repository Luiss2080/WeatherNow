import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatearHora } from '../../utilidades/formateadores';
import Tarjeta from '../comunes/Tarjeta';

// Componente para mostrar gráfico de humedad
const GraficoHumedad = ({ datos }) => {
  if (!datos || datos.length === 0) return null;

  const datosGrafico = datos.slice(0, 8).map(item => ({
    hora: formatearHora(item.fecha, item.zonaHoraria),
    humedad: item.humedad
  }));

  return (
    <Tarjeta titulo="💧 Humedad">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={datosGrafico}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hora" />
          <YAxis label={{ value: '%', angle: -90, position: 'insideLeft' }} />
          <Tooltip
            formatter={(value) => [`${value}%`, 'Humedad']}
          />
          <Bar
            dataKey="humedad"
            fill="#3b82f6"
            name="Humedad"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Tarjeta>
  );
};

export default GraficoHumedad;
