import Tarjeta from '../comunes/Tarjeta';

// Acceso rápido a los lugares favoritos, con reordenación y borrado.
const ListaFavoritos = ({ favoritos, activoId, onSeleccionar, onEliminar, onMover }) => {
  if (!favoritos || favoritos.length === 0) return null;

  return (
    <Tarjeta titulo="⭐ Lugares favoritos">
      <ul className="space-y-2">
        {favoritos.map((lugar, indice) => (
          <li key={lugar.id} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSeleccionar(lugar)}
              aria-current={activoId === lugar.id ? 'true' : undefined}
              className={`flex-1 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-blue-50 ${
                activoId === lugar.id ? 'bg-blue-50 font-semibold text-blue-800' : 'text-gray-700'
              }`}
            >
              {lugar.nombre}
              {lugar.pais ? <span className="text-gray-500">, {lugar.pais}</span> : null}
            </button>
            <button
              type="button"
              onClick={() => onMover(indice, indice - 1)}
              disabled={indice === 0}
              aria-label={`Subir ${lugar.nombre}`}
              className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-30"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => onMover(indice, indice + 1)}
              disabled={indice === favoritos.length - 1}
              aria-label={`Bajar ${lugar.nombre}`}
              className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-30"
            >
              ↓
            </button>
            <button
              type="button"
              onClick={() => onEliminar(lugar.id)}
              aria-label={`Eliminar ${lugar.nombre}`}
              className="rounded px-2 py-1 text-red-600 hover:bg-red-50"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </Tarjeta>
  );
};

export default ListaFavoritos;
