// Componente de pie de página
const PiePagina = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {new Date().getFullYear()} WeatherNow - Todos los derechos reservados
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-400">Powered by OpenWeather API</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PiePagina;
