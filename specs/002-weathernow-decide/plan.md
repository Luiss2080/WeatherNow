# Plan 002 — WeatherNow Decide

> Cómo se implementa el MVP de la spec 002. Se apoya en el estado saneado por la
> spec 001 (requisito previo: 001 terminada).

## 1. Arquitectura

```
Navegador (SPA React)
   │  fetch /api/*
   ▼
Proxy (serverless/Node)                    ← única posesión de la API key
   ├── caché (memoria + CDN)
   ├── rate limit por IP/dispositivo
   └── cliente de proveedores
         ├── OpenWeather: clima + pronóstico
         ├── OpenWeather Air Pollution: índice de aire
         └── proveedor UV
   ▼
Motor de decisión (módulo puro, compartido cliente/proxy)
```

- **Por qué proxy**: RF-14 exige no exponer la clave; además permite caché
  (RF-15), rate limit (RF-16) y normalizar varios proveedores.
- **Por qué el motor es un módulo puro**: se testea sin React ni red y puede
  ejecutarse en cliente (instantáneo) o en proxy (notificaciones).
- *Alternativa descartada:* key en `VITE_*` (incumple RF-14 y el principio 3 de
  la constitución).

## 2. Estructura de carpetas prevista

```
api/                          # proxy (Node/serverless)
  index.js                    # router /api/clima, /api/aire, /api/uv
  proveedores/                # clientes por proveedor + normalización
  cache.js                    # caché con TTL
  limite.js                   # rate limiting
src/
  dominio/decision/           # motor de decisión (puro)
    actividades.js            # umbrales por actividad
    evaluarActividad.js       # clima + aire + uv -> veredicto + motivo
    mejorFranja.js
  servicios/                  # cliente del proxy (no del proveedor)
  almacenamiento/             # favoritos, alertas y caché en localStorage
```

## 3. Modelo de datos (cliente)

```js
Lugar     { id, nombre, pais, lat, lon, timezone }
Veredicto { actividad, nivel: 'favorable'|'precaucion'|'no_recomendado',
            motivo, mejorFranja?, variables: { temp, viento, pop, uv, aqi } }
Alerta    { id, lugarId, condicion, umbral, activa, creadaEn }
Preferencias { unidades: 'metric'|'imperial', plan: 'gratis'|'premium' }
```

## 4. Motor de decisión

- Tabla de reglas por actividad en `actividades.js`: rango de temperatura/sensación,
  viento máximo, `pop` máximo, UV máximo, AQI máximo. Cada variable devuelve
  `favorable | precaucion | no_recomendado` y su motivo.
- `evaluarActividad` agrega por la peor variable (el resultado más restrictivo) y
  produce el veredicto final + frase explicativa (RF-4).
- `mejorFranja` puntúa las franjas horarias del pronóstico y devuelve la mejor
  (RF-3).
- La ausencia de UV/AQI se marca como `datoAusente` y no penaliza (RF-7).
- **Tests primero**: tabla de casos por actividad en los tres niveles y bordes.

## 5. Proxy

- Endpoints: `GET /api/clima?lat&lon`, `GET /api/pronostico`, `GET /api/aire`,
  `GET /api/uv`. Respuesta normalizada, nunca cruda del proveedor.
- Caché por clave `(tipo, lat redondeada, lon redondeada)` con TTL: clima 10 min,
  pronóstico 30 min, aire 30 min, UV 60 min (RF-15).
- Rate limit por IP (p. ej. 60 req/10 min) con cabeceras de cuota (RF-16).
- Nunca registra la clave; errores normalizados al mismo contrato que la spec 001.

## 6. Alertas

- Motor de evaluación: al abrir la app y (si se aprueba) en segundo plano se
  evalúan las alertas contra el pronóstico.
- MVP: aviso **in-app** + Web Push si la clarificación lo aprueba. El envío en
  segundo plano requiere un pequeño scheduler en el proxy.

## 7. Planes y monetización

- `plan: 'gratis'` → publicidad discreta + 1 alerta + 3 favoritos.
- `plan: 'premium'` → sin publicidad + alertas ilimitadas + favoritos ilimitados.
- El "pago" del MVP se simula mediante un flag local; la pasarela real queda
  fuera de alcance hasta validar interés.

## 8. Fases de entrega

1. **Fase A — Cimientos**: proxy + caché + endpoints normalizados + tests.
2. **Fase B — Motor de decisión**: veredictos, mejor franja, UI de tarjetas.
3. **Fase C — Personalización**: favoritos, preferencias, último lugar.
4. **Fase D — Salud**: UV y calidad del aire integrados en los veredictos.
5. **Fase E — Alertas y negocio**: reglas, límites por plan, aviso in-app.
6. **Fase F — Pulido**: PWA/offline, SEO, accesibilidad, métricas.

## 9. Riesgos

- **Datos UV/polen** dependen del proveedor y del plan gratuito.
- **Coste de API** si la caché falla; se instrumenta el contador de peticiones.
- **Alcance**: el MVP puede crecer; cada fase debe ser desplegable por separado.
- **Dependencia de 001**: sin la base saneada, los errores y la deuda se
  arrastran al proxy.

## 10. Trazabilidad RF → fase

RF-1..4→B, RF-5..7→D, RF-8..11→C, RF-12..13→E, RF-14..16→A, RF-17→E, RF-18→F.
