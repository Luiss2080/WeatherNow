// Botón para guardar/quitar el lugar actual de favoritos.
const BotonFavorito = ({ esFavorito, onAlternar, deshabilitado = false }) => (
  <button
    type="button"
    onClick={onAlternar}
    disabled={deshabilitado}
    aria-pressed={esFavorito}
    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      esFavorito
        ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
        : 'bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50'
    } ${deshabilitado ? 'cursor-not-allowed opacity-50' : ''}`}
  >
    <span aria-hidden="true">{esFavorito ? '★' : '☆'}</span>{' '}
    {esFavorito ? 'Guardado' : 'Guardar lugar'}
  </button>
);

export default BotonFavorito;
