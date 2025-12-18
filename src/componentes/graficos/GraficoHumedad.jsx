import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Tarjeta from '../comunes/Tarjeta';

// Componente para mostrar gráfico de humedad
const GraficoHumedad = ({ datos }) => {
  if (!datos || datos.length === 0) return null;

  const datosGrafico = datos.slice(0, 8).map(item => ({
    hora: new Date(item.fecha * 1000).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
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
          <Legend />
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
