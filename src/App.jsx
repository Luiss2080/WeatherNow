import ErrorBoundary from './componentes/comunes/ErrorBoundary';
import PaginaPrincipal from './vistas/PaginaPrincipal';

function App() {
  return (
    <ErrorBoundary>
      <PaginaPrincipal />
    </ErrorBoundary>
  );
}

export default App;
