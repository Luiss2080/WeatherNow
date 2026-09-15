import { useEffect, useState } from 'react';
import Tarjeta from '../comunes/Tarjeta';
import { obtenerMetricas } from '../../servicios/servicioMetricas';

// Panel de uso del proxy (contadores). Solo se muestra en desarrollo.
const PanelMetricas = () => {
  const [resumen, setResumen] = useState(null);

  useEffect(() => {
    let activo = true;
    obtenerMetricas()
      .then((datos) => {
        if (activo) setResumen(datos);
      })
      .catch(() => {});
    return () => {
      activo = false;
    };
  }, []);

  const tipos = resumen ? Object.values(resumen.porTipo || {}) : [];
  if (tipos.length === 0) return null;

  return (
    <Tarjeta titulo="📈 Uso del proxy">
      <ul className="space-y-1 text-sm text-gray-600">
        {tipos.map((datos) => (
          <li key={datos.tipo}>
            <span className="font-medium">{datos.tipo}</span> ({datos.proveedor}):{' '}
            {datos.peticiones} peticiones · {datos.aciertosCache} en caché · {datos.errores} errores
          </li>
        ))}
      </ul>
    </Tarjeta>
  );
};

export default PanelMetricas;
