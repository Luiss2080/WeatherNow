import { lazy, Suspense } from 'react';
import Encabezado from '../componentes/comunes/Encabezado';
import PiePagina from '../componentes/comunes/PiePagina';
import FormularioBusqueda from '../componentes/formularios/FormularioBusqueda';
import TarjetaClimaPrincipal from '../componentes/clima/TarjetaClimaPrincipal';
import DetallesClima from '../componentes/clima/DetallesClima';
import InfoSolarPrincipal from '../componentes/clima/InfoSolarPrincipal';
import ListaPronostico from '../componentes/pronostico/ListaPronostico';
import PanelDecisiones from '../componentes/decision/PanelDecisiones';
import Cargador from '../componentes/comunes/Cargador';
import MensajeError from '../componentes/comunes/MensajeError';
import { condicionesDesdeClima } from '../dominio/decision/franjas';
import { useClima } from '../hooks/useClima';
import { usePronostico } from '../hooks/usePronostico';
import { useGeolocalizacion } from '../hooks/useGeolocalizacion';

// Los gráficos (Recharts) se cargan aparte para no inflar el bundle inicial.
const GraficoTemperatura = lazy(() => import('../componentes/graficos/GraficoTemperatura'));
const GraficoHumedad = lazy(() => import('../componentes/graficos/GraficoHumedad'));

// Vista principal de la aplicación
const PaginaPrincipal = () => {
  const {
    datosClima,
    cargando: cargandoClima,
    error: errorClima,
    obtenerClima,
    obtenerClimaPorUbicacion
  } = useClima();
  const {
    datosPronostico,
    pronosticoPorDias,
    cargando: cargandoPronostico,
    error: errorPronostico,
    obtenerPronosticoExtendido,
    obtenerPronosticoPorUbicacion
  } = usePronostico();
  const { error: errorUbicacion, obtenerUbicacion } = useGeolocalizacion();

  const manejarBusqueda = async (ciudad) => {
    await Promise.allSettled([obtenerClima(ciudad), obtenerPronosticoExtendido(ciudad)]);
  };

  const manejarUbicacionActual = async () => {
    const coords = await obtenerUbicacion();
    if (coords) {
      await Promise.allSettled([
        obtenerClimaPorUbicacion(coords.latitud, coords.longitud),
        obtenerPronosticoPorUbicacion(coords.latitud, coords.longitud)
      ]);
    }
  };

  const cargando = cargandoClima || cargandoPronostico;
  const errorMostrado = errorClima || errorPronostico || errorUbicacion;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Encabezado />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Formulario de búsqueda */}
          <div className="mb-8">
            <FormularioBusqueda
              onBuscar={manejarBusqueda}
              onUbicacionActual={manejarUbicacionActual}
              cargando={cargando}
            />
          </div>

          {/* Mensajes de error */}
          {errorMostrado && (
            <div className="mb-6">
              <MensajeError mensaje={errorMostrado} />
            </div>
          )}

          {/* Cargador */}
          {cargando && <Cargador mensaje="Obteniendo datos del clima..." />}

          {/* Contenido principal */}
          {!cargando && datosClima && (
            <div className="space-y-8">
              {/* Sección principal del clima */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <TarjetaClimaPrincipal datosClima={datosClima} />
                </div>
                <div>
                  <InfoSolarPrincipal datosClima={datosClima} />
                </div>
              </div>

              {/* Detalles del clima */}
              <DetallesClima datosClima={datosClima} />

              {/* Decisiones por actividad (spec 002, Fase B) */}
              <PanelDecisiones
                condiciones={condicionesDesdeClima(datosClima, datosPronostico)}
                franjas={datosPronostico}
              />

              {/* Pronóstico de 5 días */}
              {pronosticoPorDias.length > 0 && (
                <ListaPronostico pronosticoPorDias={pronosticoPorDias} />
              )}

              {/* Gráficos */}
              {datosPronostico.length > 0 && (
                <Suspense fallback={<Cargador mensaje="Cargando gráficos..." />}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <GraficoTemperatura datos={datosPronostico} />
                    <GraficoHumedad datos={datosPronostico} />
                  </div>
                </Suspense>
              )}
            </div>
          )}

          {/* Mensaje inicial */}
          {!cargando && !datosClima && !errorMostrado && (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">🌦️</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Bienvenido a WeatherNow!</h2>
              <p className="text-xl text-gray-600">
                Busca una ciudad o usa tu ubicación actual para ver el clima
              </p>
            </div>
          )}
        </div>
      </main>

      <PiePagina />
    </div>
  );
};

export default PaginaPrincipal;
