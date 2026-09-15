# Tareas 002 — WeatherNow Decide

> Ninguna de estas tareas empieza hasta cerrar la spec 001 (base saneada).
> Una tarea a la vez, tests primero. `[x]` = completada y verificada.

## Fase A — Cimientos (proxy)

- [x] **TA1 — Scaffold del proxy** (RF-14)
  - `api/` con `configuracion.js`, `proxy.js` (núcleo), `pluginVite.js`
    (middleware de desarrollo) y `servidor.js` (Node).
  - La clave vive en `OPENWEATHER_API_KEY` (sin prefijo `VITE_`), por lo que no
    entra al bundle.
  - _Hecho cuando:_ `GET /api/clima` responde y el bundle no contiene `appid` ni
    la clave. **Verificado**: build sin `appid`; proxy responde 400/404/500
    según el caso.

- [x] **TA2 — Cliente del proveedor** (RF-2, RF-7)
  - `api/proveedores/openweather.js`: construye la URL con la clave y traduce
    los estados del proveedor a nuestros códigos.
  - La normalización de campos se mantiene en el cliente
    (`src/utilidades/transformadores.js`), que ya tolera campos ausentes; moverla
    al proxy queda como mejora futura.
  - _Hecho cuando:_ con clave ausente lanza `CONFIGURACION` y no inventa datos.

- [x] **TA3 — Caché con TTL** (RF-15)
  - `api/cache.js` con reloj inyectable; TTL de clima 10 min y pronóstico 30 min.
  - _Hecho cuando:_ la segunda petición idéntica responde `X-Cache: HIT`.
    **Verificado** en tests.

- [x] **TA4 — Rate limiting** (RF-16)
  - `api/limite.js` por cliente/IP con ventana; cabeceras `X-RateLimit-*`.
  - _Hecho cuando:_ superar el límite devuelve 429. **Verificado** en test y en
    las cabeceras de la respuesta real.

- [x] **TA5 — Contrato de errores del proxy** (RF-9 de 001)
  - Cuerpo `{ codigo, mensaje }` con `CIUDAD_NO_ENCONTRADA`, `CONFIGURACION`,
    `LIMITE`, `RED`, `DESCONOCIDO`; el cliente los mapea a mensajes.
  - _Hecho cuando:_ los errores del proxy se mapean a mensajes específicos.
    **Verificado** en navegador (muestra "La API key no es válida o falta").

## Fase B — Motor de decisión

- [ ] **TB1 — Tabla de reglas por actividad** (RF-1, RF-2)
  - Umbrales de temperatura, viento, `pop`, UV y AQI por actividad.
  - _Hecho cuando:_ existe un test por actividad en los tres niveles.

- [ ] **TB2 — `evaluarActividad` y motivos** (RF-4, RF-7)
  - Veredicto por peor variable + frase explicativa; marca dato ausente.
  - _Hecho cuando:_ cada veredicto incluye un motivo legible.

- [ ] **TB3 — `mejorFranja`** (RF-3)
  - Puntuar franjas del pronóstico y devolver la mejor.
  - _Hecho cuando:_ un test comprueba la franja elegida con datos conocidos.

- [ ] **TB4 — UI de veredictos** (RF-1)
  - Tarjeta por actividad con nivel, motivo y mejor franja; sin depender del color.
  - _Hecho cuando:_ se ve el veredicto de las 6 actividades del MVP.

## Fase C — Personalización

- [ ] **TC1 — Almacenamiento local** (RF-8, RF-18)
  - Módulo de favoritos/preferencias/caché en `localStorage` con validación.
  - _Hecho cuando:_ datos corruptos no rompen la app y se auto-reparan.

- [ ] **TC2 — Favoritos** (RF-8, RF-10)
  - Guardar, listar, eliminar y reordenar lugares.
  - _Hecho cuando:_ el favorito persiste entre recargas y se elimina sin residuos.

- [ ] **TC3 — Último lugar y preferencias** (RF-9, RF-11)
  - Autocarga del último lugar y selector métrico/imperial.
  - _Hecho cuando:_ al abrir la app carga el último lugar en sus unidades.

## Fase D — Salud

- [ ] **TD1 — Panel UV** (RF-5)
  - Riesgo UV con recomendación de protección.
  - _Hecho cuando:_ UV alto muestra recomendación y UV ausente no la inventa.

- [ ] **TD2 — Panel de calidad del aire** (RF-6)
  - AQI con aviso para grupos sensibles.
  - _Hecho cuando:_ AQI malo muestra aviso específico.

- [ ] **TD3 — Integración en el motor** (RF-2, RF-7)
  - UV y AQI entran en los veredictos cuando existen.
  - _Hecho cuando:_ un día con UV alto baja el nivel de las actividades de sol.

## Fase E — Alertas y negocio

- [ ] **TE1 — Reglas de alerta** (RF-12)
  - Crear/editar/activar condiciones por lugar.
  - _Hecho cuando:_ una alerta de lluvia se dispara con el pronóstico simulado.

- [ ] **TE2 — Canal de aviso** (RF-12)
  - Aviso in-app en el MVP; Web Push si la clarificación lo aprueba.
  - _Hecho cuando:_ el aviso aparece sin bloquear la interfaz.

- [ ] **TE3 — Límites por plan** (RF-13, RF-17)
  - Gratis: 1 alerta, 3 favoritos, con publicidad. Premium: ilimitado, sin ads.
  - _Hecho cuando:_ el plan gratuito no puede crear la segunda alerta.

## Fase F — Pulido

- [ ] **TF1 — Modo offline y PWA** (RF-18)
  - Service worker + último dato con antigüedad visible.
  - _Hecho cuando:_ sin conexión se muestra el dato cacheado y su fecha.

- [ ] **TF2 — SEO y landing indexable**
  - Metadatos, contenido indexable de la propuesta de valor.
  - _Hecho cuando:_ la landing muestra contenido sin ejecutar JS interactivo.

- [ ] **TF3 — Métricas y coste**
  - Contador de peticiones por proveedor y panel de cuota.
  - _Hecho cuando:_ se conoce el consumo diario estimado frente al plan gratuito.

- [ ] **TF4 — Accesibilidad y QA final**
  - Revisión de teclado, lector y contraste de los veredictos.
  - _Hecho cuando:_ el recorrido completo se realiza sin ratón.
