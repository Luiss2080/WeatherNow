// Componente de cargador/spinner
const Cargador = ({ mensaje = 'Cargando...', tamano = 'mediano' }) => {
  const tamanos = {
    pequeno: 'w-8 h-8',
    mediano: 'w-12 h-12',
    grande: 'w-16 h-16'
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-8" role="status" aria-live="polite">
      <div className={`${tamanos[tamano]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`} aria-hidden="true"></div>
      {mensaje && <p className="mt-4 text-gray-600">{mensaje}</p>}
    </div>
  );
};

export default Cargador;
