# Plan 001 — Remediación base

> Cómo se implementa la spec 001. Cada decisión técnica incluye su justificación
> y su alternativa descartada.

## 1. Estado detectado (auditoría)

| ID  | Severidad  | Hallazgo                                          | Estado    |
| --- | ---------- | ------------------------------------------------- | --------- |
| B1  | Bloqueante | React/react-dom/plugin React no declarados        | Corregido |
| B2  | Bloqueante | `tsc` sin `allowJs`/`jsx` rompía el build         | Corregido |
| B3  | Bloqueante | No existía `vite.config.js`                       | Corregido |
| B4  | Bloqueante | Tailwind 4 con config/plugin de Tailwind 3        | Corregido |
| C1  | Bug        | `formatearTemperatura` usado sin importar (crash) | Corregido |
| C2  | Bug        | Serie "sensación" duplicaba la temperatura        | Pendiente |
| C3  | Bug        | Errores de pronóstico/geo no se mostraban         | Pendiente |
| C4  | Bug        | Zona horaria del dispositivo, no de la ciudad     | Pendiente |
| C5  | Bug        | Errores HTTP colapsados en genérico               | Pendiente |
| C6  | Bug        | Imports muertos / sin cancelación ni caché        | Pendiente |
| P1  | Producción | API key hardcodeada en el bundle                  | Pendiente |
| P2  | Producción | 0 tests, 0 lint, 0 CI                             | Pendiente |
| P3  | Producción | Sin ErrorBoundary ni a11y                         | Pendiente |
| P4  | Producción | Chunk inicial > 500 kB                            | Pendiente |
| D1  | Docs       | README con datos falsos                           | Pendiente |

## 2. Decisiones técnicas

- **React 19 + `@vitejs/plugin-react`**: declarar React explícitamente (antes
  solo entraba como peer transitivo de Recharts) y habilitar Fast Refresh/JSX
  automático. _Alternativa descartada:_ depender del `esbuild` de Vite sin
  plugin (sin Fast Refresh ni runtime automático garantizado).
- **Tailwind v4 CSS-first**: `@tailwindcss/postcss` + `@import "tailwindcss";`.
  Se elimina `tailwind.config.js` (v4 detecta contenido automáticamente) y
  `autoprefixer` (integrado). _Alternativa descartada:_ `@tailwindcss/vite`
  (válida, pero obliga a cambiar más piezas).
- **`tsc --noEmit` sobre `.jsx`**: se añade `allowJs: true`, `checkJs: false` y
  `jsx: "react-jsx"` para que el typecheck tenga entradas y no falle. _Decisión
  abierta:_ migrar a TS real (ver dudas de la spec).
- **Errores tipados**: `servicioClima` lanzará un error con `codigo`
  (`CIUDAD_NO_ENCONTRADA`, `CONFIGURACION`, `LIMITE`, `RED`) derivado del status
  HTTP; la UI mapea código → mensaje (`constantes/mensajes.js`).
- **Zona horaria**: se propaga `datosApi.timezone` (segundos de offset) al
  transformador; los formateadores de hora reciben `(timestamp, offsetSegundos)`.
- **Cancelación de peticiones**: `useClima`/`usePronostico` usan `AbortController`
  y descartan respuestas obsoletas por `requestId`.
- **Errores de render**: `ErrorBoundary` de clase envolviendo `<App />`.
- **Configuración**: `.env.example` con `VITE_*` (no secretos) y nota de que la
  key real se moverá al proxy en spec 002.

## 3. Módulos y cambios previstos

```
package.json                 deps y scripts (typecheck, test, lint)
vite.config.js               plugin react
tsconfig.json                allowJs + jsx
postcss.config.js            @tailwindcss/postcss
src/style.css                @import "tailwindcss"
src/componentes/clima/DetallesClima.jsx   import corregido
src/componentes/graficos/GraficoTemperatura.jsx   serie real / sin duplicado
src/servicios/servicioClima.js    error tipado por status
src/constantes/mensajes.js        mensajes por código de error
src/utilidades/formateadores.js   hora con offset
src/utilidades/transformadores.js  propagar timezone
src/hooks/useClima.js, usePronostico.js   AbortController + estado por sección
src/componentes/comunes/ErrorBoundary.jsx  nuevo
```

## 4. Estrategia de tests

- **Vitest** + `@testing-library/react` + `jsdom`.
- Prioridad a lógica pura: `formateadores` (offsets, valores inválidos),
  `validadores`, `transformadores` (campos ausentes, agrupación por días con
  timezone) y mapeo de errores HTTP→código.
- Un test de humo de `PaginaPrincipal` (render inicial y error mostrado).
- Cobertura objetivo: 100% de los RF con lógica pura; humo para UI.

## 5. Riesgos

- **Alcance de la migración a TS**: resolver antes de T9.
- **Vulnerabilidades en devDependencies** (5 moderadas/altas tras actualizar
  `axios`): revisar en T11 y documentar las aceptadas.
- **Cobertura de la API de OpenWeather**: el _free tier_ limita UV/polen; puede
  condicionar la spec 002.

## 6. Trazabilidad RF → tareas

RF-1→T1, RF-2→T2, RF-3→T3, RF-4→T4, RF-5→T5, RF-6→T10,
RF-7→T8, RF-8→T12, RF-9→T13, RF-10→T14, RF-11→T15,
RF-12→T16, RF-13→T6, RF-14→T7.
