# Spec 002 — WeatherNow Decide (MVP de consumo)

## Contexto y objetivo

La app actual muestra datos meteorológicos, pero **no resuelve ninguna decisión**:
el usuario ve grados y humedad, no "¿puedo salir a correr ahora?". Eso la hace
intercambiable con cualquier visor de clima y sin propuesta comercial.

**WeatherNow Decide** convierte el clima en **veredictos accionables** para
actividades y salud, en español, con lugares favoritos y alertas. La promesa es:
*"Dime si puedo hacer lo que quiero hacer, no cuál es la temperatura."*

El MVP es de consumo, con un plan gratuito y un plan premium (sin publicidad y
con alertas personalizadas). Para proteger la clave del proveedor, **todo acceso
a datos externos pasa por un backend proxy** propio.

## Usuarios / actores

- **Persona activa**: corre, monta en bici, camina, organiza planes al aire libre.
- **Persona sensible al entorno**: piel, alergias, asma; le importan UV y aire.
- **Usuario gratuito**: consume veredictos y favoritos con publicidad.
- **Usuario premium**: sin publicidad, alertas y más favoritos.
- (Futuro, fuera del MVP) negocios outdoor: eventos, hostelería, logística.

## Historias de usuario

- H1: Como persona que sale a correr quiero saber **si y cuándo** es buen momento
  para entrenar al aire libre para no perder el viaje.
- H2: Como persona sensible al sol quiero saber el riesgo UV y qué protección
  necesito para cuidarme.
- H3: Como persona con alergias o asma quiero saber si el aire está bien hoy para
  decidir si limito mi exposición.
- H4: Como usuario quiero ver de un vistazo si hoy es buen día para tareas como
  tender la ropa o lavar el auto para no malgastar el día.
- H5: Como usuario quiero guardar mis lugares frecuentes para consultarlos en un
  toque.
- H6: Como usuario quiero recibir un aviso cuando se cumpla una condición que me
  importa (p. ej. "mañana a las 7 habrá lluvia") para planificar.
- H7: Como usuario premium quiero una experiencia sin publicidad y con alertas
  ilimitadas para obtener más valor.
- H8: Como responsable del producto quiero no exponer la API key ni pagar de más
  por peticiones para que el servicio sea sostenible.

## Requisitos funcionales (criterios de aceptación en EARS)

### Motor de decisiones

- **RF-1**: CUANDO el usuario consulta un lugar, EL SISTEMA DEBE mostrar, para
  cada actividad soportada (correr, ciclismo, caminar, ropa, lavar auto, evento
  al aire libre), un veredicto de tres niveles: **favorable**, **precaución** o
  **no recomendado**.
- **RF-2**: EL SISTEMA DEBE calcular cada veredicto combinando, como mínimo,
  temperatura, sensación térmica, probabilidad de precipitación, viento y, donde
  haya dato, índice UV y calidad del aire.
- **RF-3**: CUANDO existe pronóstico horario, EL SISTEMA DEBE indicar la **mejor
  franja del día** para la actividad seleccionada.
- **RF-4**: EL SISTEMA DEBE explicar el motivo del veredicto en una frase
  ("Viento fuerte: 42 km/h"), no solo el nivel.
- **RF-5**: SI el índice UV alcanza un nivel alto o superior, ENTONCES EL SISTEMA
  DEBE mostrar una recomendación de protección solar.
- **RF-6**: SI la calidad del aire es mala, ENTONCES EL SISTEMA DEBE mostrar un
  aviso específico para grupos sensibles.
- **RF-7**: SI el proveedor no devuelve datos de UV o de calidad del aire,
  ENTONCES EL SISTEMA DEBE calcular el veredicto con las variables disponibles e
  indicar que el dato falta (sin inventarlo).

### Lugares y personalización

- **RF-8**: CUANDO el usuario guarda un lugar, EL SISTEMA DEBE persistirlo y
  mostrarlo en un acceso rápido, usando el buscador de ciudades.
- **RF-9**: CUANDO el usuario abre la app y tiene un último lugar consultado,
  EL SISTEMA DEBE cargarlo automáticamente.
- **RF-10**: DONDE haya una lista de favoritos, EL SISTEMA DEBE permitir
  eliminarlos y reordenarlos.
- **RF-11**: EL SISTEMA DEBE mostrar los veredictos en las unidades configuradas
  por el usuario (métrico/imperial).

### Alertas

- **RF-12**: CUANDO el usuario configura una alerta sobre un lugar y una
  condición (p. ej. lluvia, UV alto, viento), EL SISTEMA DEBE notificarle cuando
  la condición se cumpla en el horizonte del pronóstico.
- **RF-13**: EL SISTEMA DEBE limitar el número de alertas activas según el plan
  (gratuito: 1; premium: ilimitadas).

### Plataforma, proxy y negocio

- **RF-14**: EL SISTEMA NO DEBE exponer la clave del proveedor al navegador;
  todas las llamadas a proveedores externos DEBEN pasar por el backend proxy.
- **RF-15**: EL PROXY DEBE cachear las respuestas por lugar y tipo durante un
  tiempo configurable para reducir coste y latencia.
- **RF-16**: EL PROXY DEBE aplicar límite de peticiones por cliente para
  protegerse de abusos.
- **RF-17**: EL SISTEMA DEBE ofrecer un plan gratuito con publicidad y un plan
  premium sin publicidad y con alertas ilimitadas.
- **RF-18**: MIENTRAS el dispositivo está sin conexión, EL SISTEMA DEBE mostrar
  el último dato cacheado indicando su antigüedad.

## Requisitos no funcionales

- **Rendimiento**: primera carga útil en < 2,5 s en 4G; respuestas del proxy
  cacheadas < 200 ms.
- **SEO**: la landing debe renderizarse con contenido indexable.
- **Privacidad**: el MVP no requiere cuentas; favoritos y alertas se guardan en
  el dispositivo. Sin venta de datos.
- **Coste**: el consumo debe caber en el plan gratuito del proveedor durante el
  MVP; la caché es obligatoria.
- **Accesibilidad**: veredictos no dependen solo del color (texto + icono).
- **Idioma**: español.

## Casos límite

- Ciudad sin dato de calidad del aire o UV disponible.
- Consulta en el mar / coordenadas sin ciudad.
- Actividad incompatible con el clima durante todo el horizonte (p. ej. heladas).
- Cambio de plan y reconciliación de alertas.
- Condiciones que se cumplen justo en el límite del pronóstico (5 días).
- Favoritos duplicados o corruptos en `localStorage`.

## Fuera de alcance

- Pasarela de pago real y gestión de cuentas (se validará primero el interés).
- App nativa iOS/Android.
- Web Push frente a email: se decide en la clarificación (ver dudas).
- Datos marinos, radar y nowcasting hiperlocal.
- Idiomas distintos del español.

## Criterios de finalización

- Recorrido completo: buscar → ver veredictos → guardar favorito → crear alerta →
  recibir aviso simulado.
- `npm test` cubre el motor de decisión con casos favorable/precaución/no
  recomendado y el cálculo de la mejor franja.
- El proxy no filtra la clave y responde desde caché en la segunda petición.
- Auditoría de coste: X llamadas/día estimadas dentro del plan gratuito.

## Dudas abiertas

- [NECESITA ACLARACIÓN] Proveedor de UV, calidad del aire y polen: ¿OpenWeather
  Air Pollution + UV Index API (free tier) o un agregador?
- [NECESITA ACLARACIÓN] Canal de alertas del MVP: ¿Web Push, email o aviso
  in-app al abrir?
- [NECESITA ACLARACIÓN] Modelo de precios: ¿suscripción mensual, pago único o
  patrocinios locales?
- [NECESITA ACLARACIÓN] Plataforma de despliegue del proxy: ¿Vercel/Netlify
  Functions o un servicio Node propio?
- [NECESITA ACLARACIÓN] ¿El motor de decisión debe ser configurable por el
  usuario (umbrales propios) en el MVP o en una fase posterior?
