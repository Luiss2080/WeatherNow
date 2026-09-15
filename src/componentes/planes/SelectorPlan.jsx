import { PLANES } from '../../dominio/planes';

// Selector de plan (simulado en el MVP, sin pasarela de pago).
const SelectorPlan = ({ plan, onCambiar }) => (
  <label className="flex items-center gap-2 text-sm text-gray-700">
    <span className="font-medium">Plan</span>
    <select
      value={plan}
      onChange={(evento) => onCambiar(evento.target.value)}
      className="rounded-lg border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value={PLANES.gratis.id}>{PLANES.gratis.nombre}</option>
      <option value={PLANES.premium.id}>{PLANES.premium.nombre} (demo)</option>
    </select>
  </label>
);

export default SelectorPlan;
