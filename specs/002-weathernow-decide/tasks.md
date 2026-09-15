# Tareas 002 — WeatherNow Decide

> Ninguna de estas tareas empieza hasta cerrar la spec 001 (base saneada).
> Una tarea a la vez, tests primero. `[x]` = completada y verificada.

## Fase A — Cimientos (proxy)

- [ ] **TA1 — Scaffold del proxy** (RF-14)
  - Crear `api/` con router y configuración por variables de entorno.
  - *Hecho cuando:* `GET /api/clima` responde normalizado y la clave no está en
    el bundle del cliente.

- [ ] **TA2 — Cliente de proveedores + normalización** (RF-2, RF-7)
  - Clientes de clima/pronóstico/aire/UV y contrato único de salida.
  - *Hecho cuando:* con campos ausentes devuelve `null` explícito, sin inventar.

- [ ] **TA3 — Caché con TTL** (RF-15)
  - Cachear por tipo y coordenada redondeada con los TTL del plan.
  - *Hecho cuando:* la segunda petición idéntica responde desde caché (< 200 ms).

- [ ] **TA4 — Rate limiting** (RF-16)
  - Límite por IP con cabeceras de cuota.
  - *Hecho cuando:* superar el límite devuelve 429 y la UI lo explica.

- [ ] **TA5 — Contrato de errores del proxy** (RF-9 de 001)
  - Códigos `CIUDAD_NO_ENCONTRADA`, `PROVEEDOR`, `LIMITE`, `RED`.
  - *Hecho cuando:* los errores del proxy se mapean a mensajes específicos.

## Fase B — Motor de decisión

- [ ] **TB1 — Tabla de reglas por actividad** (RF-1, RF-2)
  - Umbrales de temperatura, viento, `pop`, UV y AQI por actividad.
  - *Hecho cuando:* existe un test por actividad en los tres niveles.

- [ ] **TB2 — `evaluarActividad` y motivos** (RF-4, RF-7)
  - Veredicto por peor variable + frase explicativa; marca dato ausente.
  - *Hecho cuando:* cada veredicto incluye un motivo legible.

- [ ] **TB3 — `mejorFranja`** (RF-3)
  - Puntuar franjas del pronóstico y devolver la mejor.
  - *Hecho cuando:* un test comprueba la franja elegida con datos conocidos.

- [ ] **TB4 — UI de veredictos** (RF-1)
  - Tarjeta por actividad con nivel, motivo y mejor franja; sin depender del color.
  - *Hecho cuando:* se ve el veredicto de las 6 actividades del MVP.

## Fase C — Personalización

- [ ] **TC1 — Almacenamiento local** (RF-8, RF-18)
  - Módulo de favoritos/preferencias/caché en `localStorage` con validación.
  - *Hecho cuando:* datos corruptos no rompen la app y se auto-reparan.

- [ ] **TC2 — Favoritos** (RF-8, RF-10)
  - Guardar, listar, eliminar y reordenar lugares.
  - *Hecho cuando:* el favorito persiste entre recargas y se elimina sin residuos.

- [ ] **TC3 — Último lugar y preferencias** (RF-9, RF-11)
  - Autocarga del último lugar y selector métrico/imperial.
  - *Hecho cuando:* al abrir la app carga el último lugar en sus unidades.

## Fase D — Salud

- [ ] **TD1 — Panel UV** (RF-5)
  - Riesgo UV con recomendación de protección.
  - *Hecho cuando:* UV alto muestra recomendación y UV ausente no la inventa.

- [ ] **TD2 — Panel de calidad del aire** (RF-6)
  - AQI con aviso para grupos sensibles.
  - *Hecho cuando:* AQI malo muestra aviso específico.

- [ ] **TD3 — Integración en el motor** (RF-2, RF-7)
  - UV y AQI entran en los veredictos cuando existen.
  - *Hecho cuando:* un día con UV alto baja el nivel de las actividades de sol.

## Fase E — Alertas y negocio

- [ ] **TE1 — Reglas de alerta** (RF-12)
  - Crear/editar/activar condiciones por lugar.
  - *Hecho cuando:* una alerta de lluvia se dispara con el pronóstico simulado.

- [ ] **TE2 — Canal de aviso** (RF-12)
  - Aviso in-app en el MVP; Web Push si la clarificación lo aprueba.
  - *Hecho cuando:* el aviso aparece sin bloquear la interfaz.

- [ ] **TE3 — Límites por plan** (RF-13, RF-17)
  - Gratis: 1 alerta, 3 favoritos, con publicidad. Premium: ilimitado, sin ads.
  - *Hecho cuando:* el plan gratuito no puede crear la segunda alerta.

## Fase F — Pulido

- [ ] **TF1 — Modo offline y PWA** (RF-18)
  - Service worker + último dato con antigüedad visible.
  - *Hecho cuando:* sin conexión se muestra el dato cacheado y su fecha.

- [ ] **TF2 — SEO y landing indexable**
  - Metadatos, contenido indexable de la propuesta de valor.
  - *Hecho cuando:* la landing muestra contenido sin ejecutar JS interactivo.

- [ ] **TF3 — Métricas y coste**
  - Contador de peticiones por proveedor y panel de cuota.
  - *Hecho cuando:* se conoce el consumo diario estimado frente al plan gratuito.

- [ ] **TF4 — Accesibilidad y QA final**
  - Revisión de teclado, lector y contraste de los veredictos.
  - *Hecho cuando:* el recorrido completo se realiza sin ratón.
