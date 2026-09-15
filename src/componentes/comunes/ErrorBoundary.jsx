import { Component } from 'react';

// Captura errores de render para que la aplicación no quede en blanco.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hayError: false };
  }

  static getDerivedStateFromError() {
    return { hayError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error de render:', error, info);
  }

  render() {
    if (this.state.hayError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8" role="alert">
          <div className="max-w-md text-center bg-white rounded-xl shadow-lg p-8">
            <div className="text-6xl mb-4">🌧️</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Algo salió mal</h1>
            <p className="text-gray-600 mb-6">
              Ha ocurrido un error inesperado. Recarga la página para continuar.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Recargar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
