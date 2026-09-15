import { formatearAntiguedad } from '../../utilidades/tiempo';

// Aviso de que se están mostrando datos guardados sin conexión.
const BannerCache = ({ guardadoEn }) => (
  <div
    className="mb-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800"
    role="status"
  >
    Sin conexión con el servicio: mostrando los últimos datos guardados (
    {formatearAntiguedad(guardadoEn)}).
  </div>
);

export default BannerCache;
