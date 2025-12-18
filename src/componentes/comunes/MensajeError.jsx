// Componente para mostrar mensajes de error
const MensajeError = ({ mensaje, onCerrar = null }) => {
  if (!mensaje) return null;
  
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
      <div className="flex items-center">
        <span className="text-2xl mr-3">⚠️</span>
        <span className="block sm:inline">{mensaje}</span>
      </div>
      {onCerrar && (
        <button
          onClick={onCerrar}
          className="absolute top-0 right-0 mt-3 mr-4 text-red-700 hover:text-red-900"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default MensajeError;
