// Componente de botón reutilizable
const BotonPrincipal = ({ 
  children, 
  onClick, 
  tipo = 'button',
  variante = 'primario',
  deshabilitado = false,
  claseAdicional = ''
}) => {
  const clasesBase = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantes = {
    primario: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secundario: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400',
    peligro: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    exito: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
  };
  
  const claseDeshabilitado = deshabilitado ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      type={tipo}
      onClick={onClick}
      disabled={deshabilitado}
      className={`${clasesBase} ${variantes[variante]} ${claseDeshabilitado} ${claseAdicional}`}
    >
      {children}
    </button>
  );
};

export default BotonPrincipal;
