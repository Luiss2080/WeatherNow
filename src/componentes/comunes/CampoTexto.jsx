// Componente de input de texto reutilizable
const CampoTexto = ({ 
  valor, 
  onChange, 
  placeholder = '', 
  tipo = 'text',
  nombre = '',
  requerido = false,
  claseAdicional = ''
}) => {
  return (
    <input
      type={tipo}
      name={nombre}
      value={valor}
      onChange={onChange}
      placeholder={placeholder}
      required={requerido}
      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${claseAdicional}`}
    />
  );
};

export default CampoTexto;
