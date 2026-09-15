// Componente de encabezado de la aplicación
const Encabezado = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">🌦️</span>
            <div>
              <h1 className="text-3xl font-bold">WeatherNow</h1>
              <p className="text-blue-200 text-sm">Clima en tiempo real</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-200">
              {new Date().toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Encabezado;
