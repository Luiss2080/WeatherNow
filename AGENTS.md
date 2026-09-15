# AGENTS.md — WeatherNow

## Proyecto

**WeatherNow Decide** es una aplicación web en español que traduce el clima en
**decisiones accionables** para actividades y salud. Es una SPA de React 19 con
Vite 7 y Tailwind CSS 4, más un **proxy Node** (`api/`) que posee la clave y
agrega datos de OpenWeather (clima y pronóstico) y Open-Meteo (UV, calidad del
aire y polen). Incluye favoritos, alertas, planes y PWA/offline.

Estructura:

```
src/
├── componentes/   UI (comunes, clima, decisión, salud, favoritos, alertas, planes)
├── dominio/       lógica pura (decisión, salud, alertas, planes)
├── hooks/         estado y efectos (useClima, usePronostico, useAire…)
├── servicios/     cliente del proxy (/api)
├── utilidades/    lógica pura (formateadores, transformadores, validadores, tiempo)
├── almacenamiento/ persistencia local (favoritos, preferencias, alertas, instantánea)
├── constantes/    configuración, mensajes, iconos, colores
└── vistas/        PaginaPrincipal
api/               proxy: configuracion · proxy · cache · limite · metricas · proveedores
public/            manifest.webmanifest · sw.js (PWA)
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
- Proxy (spec 002): `npm run api` (servidor Node en http://localhost:8787/api);
  en desarrollo Vite monta el mismo proxy en `/api`.
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
- El proxy (`api/`) es el único que conoce la clave del proveedor; el cliente
  solo habla con `/api` y nunca recibe `OPENWEATHER_API_KEY`.
- No editar `dist/` ni `node_modules/` (generados, ignorados por git).

## Al terminar cualquier tarea

- `npm run typecheck` en verde.
- `npm run lint` en verde.
- `npm test` en verde.
- `npm run build` en verde.
- Actualizar la spec/README si el comportamiento cambió.
