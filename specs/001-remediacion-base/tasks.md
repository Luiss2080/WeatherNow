# Tareas 001 — Remediación base

> Una tarea a la vez. Cuando termina, sus tests y el typecheck deben estar en
> verde antes de pasar a la siguiente. `[x]` = completada y verificada.

## Puesta en marcha y build

- [x] **T1 — Declarar dependencias de React** (RF-1)
  - Añadir `react` y `react-dom` a `dependencies` y `@vitejs/plugin-react` a
    `devDependencies`.
  - _Hecho cuando:_ `npm install` deja React/ReactDOM disponibles y `npm ls react`
    no muestra "missing peer".

- [x] **T2 — Arreglar el typecheck y el build** (RF-2)
  - `tsconfig.json`: `allowJs: true`, `checkJs: false`, `jsx: "react-jsx"`.
  - `package.json`: `"build": "tsc --noEmit && vite build"`, script `typecheck`.
  - _Hecho cuando:_ `npm run typecheck` y `npm run build` salen con código 0.

- [x] **T3 — Migrar la configuración de Tailwind a v4** (RF-3)
  - Instalar `@tailwindcss/postcss`; `postcss.config.js` con
    `'@tailwindcss/postcss'`; `src/style.css` → `@import "tailwindcss";`.
  - Eliminar `tailwind.config.js` y `autoprefixer`.
  - _Hecho cuando:_ el build genera CSS con estilos de Tailwind (no 0 kB).

- [x] **T4 — Crear `vite.config.js` y verificar el arranque** (RF-4)
  - Plugin React y puerto de desarrollo.
  - _Hecho cuando:_ `npm run dev` sirve la app y la consola no muestra errores.

## Corrección de datos

- [x] **T5 — Corregir el `ReferenceError` de `DetallesClima`** (RF-5)
  - Importar `formatearTemperatura`.
  - _Hecho cuando:_ la tarjeta de detalles renderiza Mín/Máx sin error.

- [x] **T6 — Introducir Vitest y tests de lógica pura** (RF-13)
  - Instalar `vitest`, `@testing-library/react`, `jsdom`; script `npm test`.
  - Tests de `formateadores`, `validadores`, `transformadores` y mapeo de errores.
  - _Hecho cuando:_ `npm test` en verde y todo RF con lógica pura tiene test.

- [x] **T7 — Introducir ESLint + Prettier** (RF-14)
  - Config para React + hooks; script `npm run lint`.
  - _Hecho cuando:_ `npm run lint` sin errores y sin imports sin usar.

- [x] **T8 — Zona horaria por ciudad** (RF-7)
  - Propagar `timezone` de la API; formatear horas con el offset de la ciudad.
  - _Hecho cuando:_ un test comprueba que Madrid y Tokio difieren correctamente.

- [x] **T9 — Decidir el futuro de TypeScript**
  - Resolver la duda abierta de la spec: mantener `checkJs` o migrar a `.ts/.tsx`.
  - _Hecho cuando:_ la decisión queda registrada en la spec 001.

- [x] **T10 — Eliminar la serie falsa del gráfico** (RF-6)
  - Quitar `sensacion` duplicada o usar el dato real del pronóstico; limpiar
    imports sin usar.
  - _Hecho cuando:_ el gráfico muestra solo series con datos reales.

- [x] **T11 — Revisar dependencias vulnerables**
  - `npm audit`; actualizar o documentar las vulnerabilidades de desarrollo.
  - _Hecho cuando:_ `npm audit --omit=dev` sin vulnerabilidades y las de dev
    están justificadas.

## Robustez

- [x] **T12 — Cancelar peticiones obsoletas** (RF-8)
  - `AbortController` + `requestId` en `useClima`/`usePronostico`.
  - _Hecho cuando:_ cambiar de ciudad rápido no mezcla resultados.

- [x] **T13 — Errores HTTP específicos** (RF-9)
  - `servicioClima` lanza error con `codigo` según status; UI mapea a mensaje.
  - _Hecho cuando:_ 404, 401, 429 y timeout muestran mensajes distintos.

- [x] **T14 — Mostrar el error del pronóstico** (RF-10)
  - Propagar y renderizar `errorPronostico` en `PaginaPrincipal`.
  - _Hecho cuando:_ un fallo de pronóstico es visible para el usuario.

- [x] **T15 — Mostrar el error de geolocalización** (RF-11)
  - Propagar el error de `useGeolocalizacion` y permitir fallback a búsqueda.
  - _Hecho cuando:_ denegar permiso muestra un mensaje claro.

- [x] **T16 — Configuración por entorno** (RF-12)
  - Crear `.env.example`; eliminar la key del código; documentar la migración a
    proxy en la spec 002.
  - _Hecho cuando:_ no hay claves en `src/` y el build no contiene `appid`.

## Experiencia y documentación

- [x] **T17 — `ErrorBoundary` y accesibilidad base**
  - Añadir `ErrorBoundary`, labels, `aria-live` en carga/errores y foco visible.
  - _Hecho cuando:_ un error de render no deja la pantalla en blanco.

- [x] **T18 — Reducir el bundle inicial**
  - Carga diferida (`lazy`) de los gráficos; revisar manualChunks.
  - _Hecho cuando:_ el chunk inicial baja de 500 kB.

- [ ] **T19 — README veraz**
  - Corregir badges, inicio rápido, stack y estado; enlazar `specs/`.
  - _Hecho cuando:_ cada afirmación del README es comprobable en el repo.
