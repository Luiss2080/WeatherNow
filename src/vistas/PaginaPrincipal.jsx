import { lazy, Suspense, useEffect, useRef } from 'react';
import Encabezado from '../componentes/comunes/Encabezado';
import PiePagina from '../componentes/comunes/PiePagina';
import FormularioBusqueda from '../componentes/formularios/FormularioBusqueda';
import TarjetaClimaPrincipal from '../componentes/clima/TarjetaClimaPrincipal';
import DetallesClima from '../componentes/clima/DetallesClima';
import InfoSolarPrincipal from '../componentes/clima/InfoSolarPrincipal';
import ListaPronostico from '../componentes/pronostico/ListaPronostico';
import PanelDecisiones from '../componentes/decision/PanelDecisiones';
import PanelSalud from '../componentes/salud/PanelSalud';
import ListaFavoritos from '../componentes/favoritos/ListaFavoritos';
import BotonFavorito from '../componentes/favoritos/BotonFavorito';
import SelectorUnidades from '../componentes/favoritos/SelectorUnidades';
import SelectorPlan from '../componentes/planes/SelectorPlan';
import AnuncioDemo from '../componentes/planes/AnuncioDemo';
import PanelAlertas from '../componentes/alertas/PanelAlertas';
import Cargador from '../componentes/comunes/Cargador';
import MensajeError from '../componentes/comunes/MensajeError';
import BannerCache from '../componentes/comunes/BannerCache';
import PanelMetricas from '../componentes/comunes/PanelMetricas';
import { condicionesDesdeClima } from '../dominio/decision/franjas';
import { evaluarAlerta } from '../dominio/alertas/evaluarAlerta';
import { limiteAlertas, limiteFavoritos, mostrarPublicidad } from '../dominio/planes';
import { crearLugarDesdeClima } from '../almacenamiento/favoritos';
import { useClima } from '../hooks/useClima';
import { usePronostico } from '../hooks/usePronostico';
import { useGeolocalizacion } from '../hooks/useGeolocalizacion';
import { useFavoritos } from '../hooks/useFavoritos';
import { useAlertas } from '../hooks/useAlertas';
import { usePreferencias } from '../hooks/usePreferencias';
import { useUltimoLugar } from '../hooks/useUltimoLugar';
import { useAire } from '../hooks/useAire';
import { useInstantanea } from '../hooks/useInstantanea';

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
  const { datosAire, cargarAire } = useAire();
  const { preferencias, cambiarUnidades, cambiarPlan } = usePreferencias();
  const { favoritos, agregar, eliminar, reordenar } = useFavoritos(
    limiteFavoritos(preferencias.plan)
  );
  const {
    alertas,
    agregar: agregarAlerta,
    eliminar: eliminarAlerta,
    alternar: alternarAlerta
  } = useAlertas(limiteAlertas(preferencias.plan));
  const { ultimoLugar, recordar } = useUltimoLugar();
  const { instantanea, recordar: recordarInstantanea } = useInstantanea();
  const cargadoInicial = useRef(false);

  const manejarBusqueda = async (ciudad) => {
    const [clima] = await Promise.allSettled([
      obtenerClima(ciudad),
      obtenerPronosticoExtendido(ciudad)
    ]);
    if (clima.status === 'fulfilled' && clima.value?.coordenadas) {
      cargarAire(clima.value.coordenadas.latitud, clima.value.coordenadas.longitud);
    }
  };

  const cargarLugar = async (lugar) => {
    await Promise.allSettled([
      obtenerClimaPorUbicacion(lugar.lat, lugar.lon),
      obtenerPronosticoPorUbicacion(lugar.lat, lugar.lon)
    ]);
    cargarAire(lugar.lat, lugar.lon);
  };

  const manejarUbicacionActual = async () => {
    const coords = await obtenerUbicacion();
    if (coords) {
      await Promise.allSettled([
        obtenerClimaPorUbicacion(coords.latitud, coords.longitud),
        obtenerPronosticoPorUbicacion(coords.latitud, coords.longitud)
      ]);
      cargarAire(coords.latitud, coords.longitud);
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

  // Guarda una instantánea para poder mostrar datos sin conexión.
  useEffect(() => {
    if (datosClima?.ciudad) {
      recordarInstantanea({ datosClima, datosPronostico, datosAire, guardadoEn: Date.now() });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datosClima, datosPronostico, datosAire]);

  const cargando = cargandoClima || cargandoPronostico;
  const errorMostrado = errorClima || errorPronostico || errorUbicacion;

  // Si falla la red pero hay instantánea, se muestran los últimos datos.
  const usandoCache = !datosClima && Boolean(instantanea) && Boolean(errorMostrado);
  const climaMostrado = datosClima || (usandoCache ? instantanea.datosClima : null);
  const pronosticoMostrado = datosClima
    ? datosPronostico
    : usandoCache
      ? instantanea.datosPronostico || []
      : [];
  const aireMostrado = datosClima ? datosAire : usandoCache ? instantanea.datosAire || null : null;

  const lugarActual = climaMostrado ? crearLugarDesdeClima(climaMostrado) : null;
  const esFavorito = lugarActual
    ? favoritos.some((favorito) => favorito.id === lugarActual.id)
    : false;

  const alternarFavorito = () => {
    if (!lugarActual) return;
    if (esFavorito) eliminar(lugarActual.id);
    else agregar(lugarActual);
  };

  const alertasDisparadas = lugarActual
    ? alertas
        .filter((alerta) => alerta.activa && alerta.lugarId === lugarActual.id)
        .map((alerta) => ({
          alerta,
          resultado: evaluarAlerta(alerta, { franjas: pronosticoMostrado, aire: aireMostrado })
        }))
        .filter((entrada) => entrada.resultado.cumplida)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-blue-700"
      >
        Saltar al contenido
      </a>
      <Encabezado />

      <main id="contenido-principal" className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Búsqueda, unidades y favoritos */}
          <div className="mb-8 space-y-4">
            <FormularioBusqueda
              onBuscar={manejarBusqueda}
              onUbicacionActual={manejarUbicacionActual}
              cargando={cargando}
            />
            <div className="flex flex-wrap justify-end gap-4">
              <SelectorUnidades unidades={preferencias.unidades} onCambiar={cambiarUnidades} />
              <SelectorPlan plan={preferencias.plan} onCambiar={cambiarPlan} />
            </div>
            <ListaFavoritos
              favoritos={favoritos}
              activoId={lugarActual?.id}
              onSeleccionar={cargarLugar}
              onEliminar={eliminar}
              onMover={reordenar}
            />
            {mostrarPublicidad(preferencias.plan) && <AnuncioDemo />}
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
                condiciones={condicionesDesdeClima(datosClima, datosPronostico, datosAire)}
                franjas={datosPronostico}
                unidades={preferencias.unidades}
              />

              {/* Salud: UV, calidad del aire y polen (spec 002, Fase D) */}
              <PanelSalud aire={datosAire} />

              {/* Alertas (spec 002, Fase E) */}
              <PanelAlertas
                lugar={lugarActual}
                alertas={alertas}
                disparadas={alertasDisparadas}
                limite={limiteAlertas(preferencias.plan)}
                onAgregar={agregarAlerta}
                onEliminar={eliminarAlerta}
                onAlternar={alternarAlerta}
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
