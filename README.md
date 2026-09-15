<div align="center">

# 🌦️ WeatherNow

### *Tu ventana al clima del mundo en tiempo real*

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

| Spec | Qué es | Estado |
|------|--------|--------|
| [001 — Remediación base](specs/001-remediacion-base/spec.md) | Sanear el proyecto: dependencias, build, bugs, errores, tests. | En curso |
| [002 — WeatherNow Decide](specs/002-weathernow-decide/spec.md) | MVP de consumo con veredictos, salud, favoritos, alertas y proxy. | Especificado |

Artefactos SDD: [constitución](docs/constitution.md) ·
[AGENTS.md](AGENTS.md) · [plan 001](specs/001-remediacion-base/plan.md) ·
[tareas 001](specs/001-remediacion-base/tasks.md) ·
[plan 002](specs/002-weathernow-decide/plan.md) ·
[tareas 002](specs/002-weathernow-decide/tasks.md).

---

## ✅ Estado real (no lo que nos gustaría)

Lo que **hoy** funciona en un clon limpio:

- `npm install` instala dependencias declaradas (React 19, Vite 7, Tailwind 4).
- `npm run dev` sirve la SPA en http://localhost:5173.
- `npm run build` y `npm run typecheck` pasan.
- Búsqueda por ciudad y "Mi ubicación", tarjetas, pronóstico de 5 días y gráficos.

Todavía **no** está hecho (con trazabilidad en las specs):

- Tests (`npm test`) y lint (`npm run lint`) — spec 001.
- Zona horaria por ciudad, errores específicos, cancelación de peticiones — 001.
- Backend proxy para no exponer la API key — spec 002.
- Veredictos, salud, favoritos y alertas — spec 002.

> ⚠️ **Secretos**: hoy la clave se lee de
> `src/constantes/configuracionApi.js` (placeholder `TU_API_KEY_AQUI`). **No
> commitees una clave real**: en producción pasará al proxy (spec 002, RF-14).

---

## 🚀 Inicio Rápido

```bash
# 1️⃣ Instalar dependencias
npm install

# 2️⃣ Clave de OpenWeather
# Edita src/constantes/configuracionApi.js y sustituye TU_API_KEY_AQUI.
# Obtén una gratis en: https://openweathermap.org/api

# 3️⃣ Lanzar
npm run dev
# 🎉 http://localhost:5173
```

---

## 🛠️ Stack Tecnológico

| Herramienta | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19 | UI con componentes y hooks |
| **Vite** | 7 | Build y servidor de desarrollo |
| **Tailwind CSS** | 4 (CSS-first) | Estilos |
| **Axios** | 1.20 | Cliente HTTP |
| **Recharts** | 3 | Gráficos |
| **TypeScript** | 5.9 | `typecheck` de los `.jsx` (`allowJs`, sin migrar a `.ts`) |

Pendiente de introducir (spec 001): **Vitest** + Testing Library, **ESLint** y
**Prettier**.

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
├── 📂 docs/           constitution.md
├── 📂 specs/          001-remediacion-base · 002-weathernow-decide
├── 📄 vite.config.js  plugin React
├── 📄 postcss.config.js  @tailwindcss/postcss
└── 📄 tsconfig.json   typecheck de .jsx
```

---

## 🎮 Cómo Usar

| Acción | Resultado |
|--------|-----------|
| 🔍 **Buscar ciudad** | Madrid, Tokyo, New York… |
| 📍 **Mi ubicación** | Clima de tu posición |
| 📊 **Ver gráficos** | Temperatura y humedad por franjas |
| 📅 **Pronóstico** | Próximos 5 días |

---

## 🚀 Scripts

```bash
npm run dev        # Desarrollo con hot-reload
npm run build      # typecheck + build de producción
npm run typecheck  # tsc --noEmit
npm run preview    # Previsualizar la build
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
