<div align="center">

# 🌦️ WeatherNow

### _Tu ventana al clima del mundo en tiempo real_

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)

[🚀 Inicio Rápido](#-inicio-rápido) • [🧭 Rumbo](#-rumbo-del-producto) • [📁 Estructura](#-arquitectura-del-proyecto)

</div>

---

## 💡 ¿Qué es WeatherNow?

**WeatherNow** es una aplicación web en español que consulta el clima de
cualquier ciudad (OpenWeather) y lo presenta con tarjetas y gráficos.

Hoy es un **visor de datos**. El rumbo acordado es evolucionar a
**WeatherNow Decide**: convertir el clima en **decisiones accionables**
(¿salgo a correr?, ¿me protejo del sol?, ¿está el aire bien para mis
alergias?), con lugares favoritos y alertas.

> 📌 Este repositorio se desarrolla con **Spec-Driven Development (SDD)**: la
> especificación manda y el código debe decir la verdad. Ver [Rumbo](#-rumbo-del-producto).

---

## 🧭 Rumbo del producto

El estado y el plan no se describen aquí "de memoria": viven en las specs.

| Spec                                                           | Qué es                                                            | Estado       |
| -------------------------------------------------------------- | ----------------------------------------------------------------- | ------------ |
| [001 — Remediación base](specs/001-remediacion-base/spec.md)   | Sanear el proyecto: dependencias, build, bugs, errores, tests.    | Completada   |
| [002 — WeatherNow Decide](specs/002-weathernow-decide/spec.md) | MVP de consumo con veredictos, salud, favoritos, alertas y proxy. | En curso (Fase A) |

Artefactos SDD: [constitución](docs/constitution.md) ·
[AGENTS.md](AGENTS.md) · [plan 001](specs/001-remediacion-base/plan.md) ·
[tareas 001](specs/001-remediacion-base/tasks.md) ·
[plan 002](specs/002-weathernow-decide/plan.md) ·
[tareas 002](specs/002-weathernow-decide/tasks.md).

---

## ✅ Estado real (no lo que nos gustaría)

Lo que **hoy** funciona en un clon limpio (spec 001):

- `npm install` instala dependencias declaradas (React 19, Vite 7, Tailwind 4).
- `npm run dev`, `npm run build`, `npm run typecheck`, `npm test` y `npm run lint`
  pasan.
- Búsqueda por ciudad y "Mi ubicación", tarjetas, pronóstico de 5 días y gráficos.
- Horas en la **zona horaria de la ciudad** consultada.
- Errores específicos: ciudad no encontrada, API key, límite de peticiones,
  conexión y permiso de ubicación.
- `ErrorBoundary` (un fallo de render no deja la pantalla en blanco) y a11y básica.
- Bundle inicial ~293 kB (los gráficos se cargan bajo demanda).

Todavía **no** está hecho (spec 002):

- Backend proxy para no exponer la API key.
- Veredictos por actividad, salud (UV/aire), favoritos y alertas.

> ⚠️ **Secretos**: la clave se lee de `.env` (`VITE_API_KEY`), que **no se
> commitea**. Aun así, las variables `VITE_*` viajan al navegador; la protección
> real llegará con el proxy (spec 002, RF-14). Nunca commitees tu `.env`.

---

## 🚀 Inicio Rápido

```bash
# 1️⃣ Instalar dependencias
npm install

# 2️⃣ Configurar la clave de OpenWeather
# Copia el ejemplo y rellena tu clave:
#   cp .env.example .env
# Obtén una gratis en: https://openweathermap.org/api

# 3️⃣ Lanzar
npm run dev
# 🎉 http://localhost:5173
```

---

## 🛠️ Stack Tecnológico

| Herramienta              | Versión       | Propósito                                                 |
| ------------------------ | ------------- | --------------------------------------------------------- |
| **React**                | 19            | UI con componentes y hooks                                |
| **Vite**                 | 7             | Build y servidor de desarrollo                            |
| **Tailwind CSS**         | 4 (CSS-first) | Estilos                                                   |
| **Axios**                | 1.20          | Cliente HTTP                                              |
| **Recharts**             | 3             | Gráficos (carga diferida)                                 |
| **TypeScript**           | 5.9           | `typecheck` de los `.jsx` (`allowJs`, sin migrar a `.ts`) |
| **Vitest** + Testing Lib | 5 / 16        | Tests unitarios y de componentes                          |
| **ESLint** + Prettier    | 9 / 3         | Lint y formato                                            |

---

## 📁 Arquitectura del Proyecto

```
📦 WeatherNow/
├── 📂 src/
│   ├── componentes/   comunes · clima · formularios · graficos · pronostico
│   ├── hooks/         useClima · usePronostico · useGeolocalizacion
│   ├── servicios/     clienteApi · servicioClima · servicioGeolocalizacion
│   ├── utilidades/    formateadores · transformadores · validadores
│   ├── constantes/    configuración · mensajes · iconos · colores
│   └── vistas/        PaginaPrincipal
├── 📂 tests/          Vitest + Testing Library
├── 📂 docs/           constitution.md
├── 📂 specs/          001-remediacion-base · 002-weathernow-decide
├── 📄 .env.example    variables de entorno (sin secretos)
├── 📄 vite.config.js  plugin React
├── 📄 vitest.config.js  entorno de tests
├── 📄 eslint.config.js  ESLint (flat config)
└── 📄 tsconfig.json   typecheck de .jsx
```

---

## 🎮 Cómo Usar

| Acción               | Resultado                         |
| -------------------- | --------------------------------- |
| 🔍 **Buscar ciudad** | Madrid, Tokyo, New York…          |
| 📍 **Mi ubicación**  | Clima de tu posición              |
| 📊 **Ver gráficos**  | Temperatura y humedad por franjas |
| 📅 **Pronóstico**    | Próximos 5 días                   |

---

## 🚀 Scripts

```bash
npm run dev           # Desarrollo con hot-reload
npm run build         # typecheck + build de producción
npm run typecheck     # tsc --noEmit
npm test              # Vitest (una pasada)
npm run test:watch    # Vitest en modo watch
npm run lint          # ESLint
npm run format        # Prettier --write
npm run preview       # Previsualizar la build
```

---

## 📝 Cómo se trabaja aquí (SDD)

1. **Constitución** → principios en `docs/constitution.md`.
2. **Spec** → requisitos `RF-x` en notación EARS en `specs/NNN-nombre/spec.md`.
3. **Plan** → decisiones técnicas en `plan.md`.
4. **Tareas** → checklist verificable en `tasks.md`.
5. **Implementación** una tarea a la vez; **validación** RF por RF.

Ningún comportamiento se implementa sin un `RF-x` que lo respalde.

---

<div align="center">

Hecho con ❤️ usando React + TailwindCSS

[⬆️ Volver arriba](#-weathernow)

</div>
