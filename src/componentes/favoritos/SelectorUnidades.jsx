import { UNIDADES } from '../../utilidades/formateadores';

// Selector de unidades (solo afecta a la presentación).
const SelectorUnidades = ({ unidades, onCambiar }) => (
  <label className="flex items-center gap-2 text-sm text-gray-700">
    <span className="font-medium">Unidades</span>
    <select
      value={unidades}
      onChange={(evento) => onCambiar(evento.target.value)}
      className="rounded-lg border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value={UNIDADES.METRICO}>°C · km/h</option>
      <option value={UNIDADES.IMPERIAL}>°F · mph</option>
    </select>
  </label>
);

export default SelectorUnidades;
