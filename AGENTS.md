# AGENTS.md — WeatherNow

## Proyecto

WeatherNow es una aplicación web de clima en español. Hoy es una SPA de React 19
con Vite 7 y Tailwind CSS 4 que consulta OpenWeather (clima actual + pronóstico de
5 días) y lo presenta con tarjetas y gráficos (Recharts).

Dirección de producto acordada (spec 002): evolucionar de "visor de datos" a
**WeatherNow Decide**, un MVP de consumo que traduce el clima en **decisiones
accionables** para actividades y salud (UV, calidad del aire), con lugares
favoritos y alertas. A partir de esa spec, la app incorpora un **backend proxy**
para no exponer la API key.

Estructura:

```
src/
├── componentes/   UI (comunes, clima, formularios, graficos, pronostico)
├── hooks/         estado y efectos (useClima, usePronostico, useGeolocalizacion)
├── servicios/     acceso a APIs (clienteApi, servicioClima, servicioGeolocalizacion)
├── utilidades/    lógica pura (formateadores, transformadores, validadores)
├── constantes/    configuración, mensajes, iconos, colores
└── vistas/        PaginaPrincipal
tests/             tests con Vitest + Testing Library
docs/              constitución y guías
specs/             specs, planes y tareas (SDD)
```

## Comandos

- Instalar: `npm install`
- Desarrollo: `npm run dev` (Vite en http://localhost:5173)
- Build: `npm run build` (`tsc --noEmit && vite build`)
- Typecheck: `npm run typecheck`
- Tests: `npm test` (Vitest, una pasada) · `npm run test:watch`
- Lint: `npm run lint` (ESLint)
- Formato: `npm run format` · comprobar con `npm run format:check`
- Preview: `npm run preview`

## Estilo y convenciones

- Componentes funcionales y hooks; sin clases.
- Identificadores, comentarios y textos de UI en español.
- `PascalCase` para componentes y ficheros de componente; `camelCase` para
  utilidades y servicios; `useX` para hooks; `MAYÚSCULAS` para constantes.
- Componentes pequeños y de responsabilidad única (~150 líneas máx.).
- Tailwind CSS 4 en modo CSS-first: `src/style.css` usa `@import "tailwindcss";`.
  No reintroducir `tailwind.config.js` ni directivas `@tailwind`.
- Formato con Prettier (`.prettierrc.json`): comillas simples, punto y coma,
  ancho 100.

## Reglas

- Lee `docs/constitution.md` y la spec activa **antes** de tocar código.
- Ningún comportamiento se implementa sin `RF-x` que lo respalde.
- La lógica con invariantes (formateadores, transformadores, errores) va con
  test en `tests/`.
- No añadir dependencias sin justificarlo y acordarlo.
- No hardcodear secretos ni claves; usa variables de entorno (`.env.example`).
- No editar `dist/` ni `node_modules/` (generados, ignorados por git).
- No tocar el proxy/backend hasta que lo defina la spec 002.

## Al terminar cualquier tarea

- `npm run typecheck` en verde.
- `npm run lint` en verde.
- `npm test` en verde.
- `npm run build` en verde.
- Actualizar la spec/README si el comportamiento cambió.
