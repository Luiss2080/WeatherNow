import { useState } from 'react';
import CampoTexto from '../comunes/CampoTexto';
import BotonPrincipal from '../comunes/BotonPrincipal';
import { validarNombreCiudad } from '../../utilidades/validadores';
import Tarjeta from '../comunes/Tarjeta';

// Componente de formulario para buscar clima por ciudad
const FormularioBusqueda = ({ onBuscar, onUbicacionActual, cargando = false }) => {
  const [ciudad, setCiudad] = useState('');
  const [errorValidacion, setErrorValidacion] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    setErrorValidacion('');
    
    const validacion = validarNombreCiudad(ciudad);
    if (!validacion.valido) {
      setErrorValidacion(validacion.mensaje);
      return;
    }
    
    onBuscar(ciudad);
    setCiudad('');
  };

  const manejarUbicacionActual = () => {
    setErrorValidacion('');
    onUbicacionActual();
  };

  return (
    <Tarjeta>
      <form onSubmit={manejarEnvio} className="space-y-4">
        <div>
          <CampoTexto
            valor={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            placeholder="Buscar ciudad..."
            nombre="ciudad"
          />
          {errorValidacion && (
            <p className="text-red-500 text-sm mt-1">{errorValidacion}</p>
          )}
        </div>
        
        <div className="flex gap-3">
          <BotonPrincipal 
            tipo="submit" 
            variante="primario"
            deshabilitado={cargando}
            claseAdicional="flex-1"
          >
            {cargando ? 'Buscando...' : '🔍 Buscar'}
          </BotonPrincipal>
          
          <BotonPrincipal 
            tipo="button"
            variante="secundario"
            onClick={manejarUbicacionActual}
            deshabilitado={cargando}
          >
            📍 Mi ubicación
          </BotonPrincipal>
        </div>
      </form>
    </Tarjeta>
  );
};

export default FormularioBusqueda;
