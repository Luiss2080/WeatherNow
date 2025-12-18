// Componente para mostrar un ítem individual de detalle del clima
const ItemDetalle = ({ icono, etiqueta, valor }) => {
  return (
    <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
      <span className="text-3xl mb-2">{icono}</span>
      <p className="text-sm text-gray-600">{etiqueta}</p>
      <p className="text-lg font-semibold text-gray-800">{valor}</p>
    </div>
  );
};

export default ItemDetalle;
