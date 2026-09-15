import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { formatearHora } from '../../utilidades/formateadores';
import Tarjeta from '../comunes/Tarjeta';

// Componente para mostrar gráfico de temperatura
const GraficoTemperatura = ({ datos }) => {
  if (!datos || datos.length === 0) return null;

  const datosGrafico = datos.slice(0, 8).map((item) => ({
    hora: formatearHora(item.fecha, item.zonaHoraria),
    temperatura: Math.round(item.temperatura)
  }));

  return (
    <Tarjeta titulo="📊 Pronóstico de Temperatura">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={datosGrafico}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hora" />
          <YAxis label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => [`${value}°C`, 'Temperatura']} />
          <Line
            type="monotone"
            dataKey="temperatura"
            stroke="#3b82f6"
            strokeWidth={3}
            name="Temperatura"
            dot={{ fill: '#3b82f6', r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Tarjeta>
  );
};

export default GraficoTemperatura;
