import { lazy, Suspense, useEffect, useRef } from 'react';
import Encabezado from '../componentes/comunes/Encabezado';
import PiePagina from '../componentes/comunes/PiePagina';
import FormularioBusqueda from '../componentes/formularios/FormularioBusqueda';
import TarjetaClimaPrincipal from '../componentes/clima/TarjetaClimaPrincipal';
import DetallesClima from '../componentes/clima/DetallesClima';
import InfoSolarPrincipal from '../componentes/clima/InfoSolarPrincipal';
import ListaPronostico from '../componentes/pronostico/ListaPronostico';
import PanelDecisiones from '../componentes/decision/PanelDecisiones';
import ListaFavoritos from '../componentes/favoritos/ListaFavoritos';
import BotonFavorito from '../componentes/favoritos/BotonFavorito';
import SelectorUnidades from '../componentes/favoritos/SelectorUnidades';
import Cargador from '../componentes/comunes/Cargador';
import MensajeError from '../componentes/comunes/MensajeError';
import { condicionesDesdeClima } from '../dominio/decision/franjas';
import { crearLugarDesdeClima } from '../almacenamiento/favoritos';
import { useClima } from '../hooks/useClima';
import { usePronostico } from '../hooks/usePronostico';
import { useGeolocalizacion } from '../hooks/useGeolocalizacion';
import { useFavoritos } from '../hooks/useFavoritos';
import { usePreferencias } from '../hooks/usePreferencias';
import { useUltimoLugar } from '../hooks/useUltimoLugar';

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
  const { preferencias, cambiarUnidades } = usePreferencias();
  const { favoritos, agregar, eliminar, reordenar } = useFavoritos();
  const { ultimoLugar, recordar } = useUltimoLugar();
  const cargadoInicial = useRef(false);

  const manejarBusqueda = async (ciudad) => {
    await Promise.allSettled([obtenerClima(ciudad), obtenerPronosticoExtendido(ciudad)]);
  };

  const cargarLugar = async (lugar) => {
    await Promise.allSettled([
      obtenerClimaPorUbicacion(lugar.lat, lugar.lon),
      obtenerPronosticoPorUbicacion(lugar.lat, lugar.lon)
    ]);
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

  // Autocarga el último lugar consultado, una sola vez al abrir la app.
  useEffect(() => {
    if (cargadoInicial.current || !ultimoLugar) return;
    cargadoInicial.current = true;
    cargarLugar(ultimoLugar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ultimoLugar]);

  // Recuerda el lugar cuando cambia el clima mostrado.
  useEffect(() => {
    if (datosClima?.ciudad) recordar(crearLugarDesdeClima(datosClima));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datosClima]);

  const cargando = cargandoClima || cargandoPronostico;
  const errorMostrado = errorClima || errorPronostico || errorUbicacion;

  const lugarActual = datosClima ? crearLugarDesdeClima(datosClima) : null;
  const esFavorito = lugarActual
    ? favoritos.some((favorito) => favorito.id === lugarActual.id)
    : false;

  const alternarFavorito = () => {
    if (!lugarActual) return;
    if (esFavorito) eliminar(lugarActual.id);
    else agregar(lugarActual);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Encabezado />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Búsqueda, unidades y favoritos */}
          <div className="mb-8 space-y-4">
            <FormularioBusqueda
              onBuscar={manejarBusqueda}
              onUbicacionActual={manejarUbicacionActual}
              cargando={cargando}
            />
            <div className="flex justify-end">
              <SelectorUnidades unidades={preferencias.unidades} onCambiar={cambiarUnidades} />
            </div>
            <ListaFavoritos
              favoritos={favoritos}
              activoId={lugarActual?.id}
              onSeleccionar={cargarLugar}
              onEliminar={eliminar}
              onMover={reordenar}
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
                <div className="lg:col-span-2 space-y-4">
                  <TarjetaClimaPrincipal datosClima={datosClima} unidades={preferencias.unidades} />
                  <div className="flex justify-end">
                    <BotonFavorito esFavorito={esFavorito} onAlternar={alternarFavorito} />
                  </div>
                </div>
                <div>
                  <InfoSolarPrincipal datosClima={datosClima} />
                </div>
              </div>

              {/* Detalles del clima */}
              <DetallesClima datosClima={datosClima} unidades={preferencias.unidades} />

              {/* Decisiones por actividad (spec 002, Fase B) */}
              <PanelDecisiones
                condiciones={condicionesDesdeClima(datosClima, datosPronostico)}
                franjas={datosPronostico}
                unidades={preferencias.unidades}
              />

              {/* Pronóstico de 5 días */}
              {pronosticoPorDias.length > 0 && (
                <ListaPronostico
                  pronosticoPorDias={pronosticoPorDias}
                  unidades={preferencias.unidades}
                />
              )}

              {/* Gráficos */}
              {datosPronostico.length > 0 && (
                <Suspense fallback={<Cargador mensaje="Cargando gráficos..." />}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <GraficoTemperatura datos={datosPronostico} unidades={preferencias.unidades} />
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
