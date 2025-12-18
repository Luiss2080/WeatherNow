// Componente de tarjeta reutilizable
const Tarjeta = ({ 
  children, 
  titulo = null,
  claseAdicional = '',
  sombraGrande = false
}) => {
  const claseSombra = sombraGrande ? 'shadow-2xl' : 'shadow-lg';
  
  return (
    <div className={`bg-white rounded-xl ${claseSombra} p-6 ${claseAdicional}`}>
      {titulo && (
        <h3 className="text-xl font-bold text-gray-800 mb-4">{titulo}</h3>
      )}
      {children}
    </div>
  );
};

export default Tarjeta;
