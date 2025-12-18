<div align="center">

# 🌦️ WeatherNow

### *Tu ventana al clima del mundo en tiempo real*

![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)

[🚀 Inicio Rápido](#-inicio-rápido) • [✨ Características](#-qué-hace-especial-a-weathernow) • [📁 Estructura](#-arquitectura-del-proyecto)

</div>

---

## 💡 ¿Qué es WeatherNow?

**WeatherNow** es una aplicación web moderna que transforma datos meteorológicos en una experiencia visual interactiva. Consulta el clima de cualquier ciudad del mundo, visualiza tendencias con gráficos dinámicos y planifica tu día con pronósticos precisos.

> 🎯 **Perfecta para**: Desarrolladores que buscan un proyecto modular y bien estructurado, o usuarios que quieren una app de clima limpia y funcional.

---

## ✨ ¿Qué hace especial a WeatherNow?

<table>
<tr>
<td width="50%">

### 🌍 **Inteligente**
- 🔍 Búsqueda global de ciudades
- 📍 Auto-detección de ubicación
- 🌡️ Datos en tiempo real
- 🌅 Info solar (amanecer/atardecer)

</td>
<td width="50%">

### 📊 **Visual**
- 📈 Gráficos interactivos (Recharts)
- 🎨 UI moderna con Tailwind
- 📱 Diseño responsivo
- ⚡ Rendimiento optimizado (Vite)

</td>
</tr>
</table>

---

## 🚀 Inicio Rápido

```bash
# 1️⃣ Instalar dependencias
npm install

# 2️⃣ Configurar API Key
# Edita: src/constantes/configuracionApi.js
# Obtén tu key GRATIS en: https://openweathermap.org/api

# 3️⃣ Lanzar aplicación
npm run dev

# 🎉 Abre http://localhost:5173
```

<details>
<summary><b>🔑 ¿Cómo obtener mi API Key?</b></summary>

1. Regístrate en [OpenWeather](https://openweathermap.org/api) (gratis)
2. Copia tu API Key
3. Pégala en `src/constantes/configuracionApi.js`:
   ```javascript
   API_KEY: 'tu_api_key_aqui'
   ```
</details>

---

## 🛠️ Stack Tecnológico

| Herramienta | Propósito | Por qué |
|------------|-----------|---------|
| **React** | UI Framework | Componentes reutilizables y estado reactivo |
| **TailwindCSS** | Estilos | Desarrollo rápido con utility-first |
| **Axios** | HTTP Client | Peticiones API simplificadas |
| **Recharts** | Gráficos | Visualización de datos elegante |
| **Vite** | Build Tool | HMR ultrarrápido y builds optimizados |

---

## 📁 Arquitectura del Proyecto

> 🏗️ **Filosofía**: Código modular, archivos pequeños, nombres descriptivos en español.

```
📦 WeatherNow/
├── 📂 src/
│   ├── 🎨 componentes/
│   │   ├── comunes/          → 7 componentes UI reutilizables
│   │   ├── clima/            → 4 componentes de datos climáticos
│   │   ├── formularios/      → Búsqueda y controles
│   │   ├── graficos/         → Visualizaciones interactivas
│   │   └── pronostico/       → Componentes de pronóstico
│   │
│   ├── 🔧 hooks/             → 3 custom hooks (clima, pronóstico, geo)
│   ├── 🌐 servicios/         → APIs de clima y geolocalización
│   ├── 🛠️ utilidades/        → Formateadores, validadores, transformadores
│   ├── 📊 constantes/        → Config API, mensajes, iconos, colores
│   └── 🖼️ vistas/            → Página principal integrada
│
└── 📄 Archivos raíz → index.html, vite.config, tailwind.config
```

<details>
<summary><b>📊 Estadísticas del Código</b></summary>

- **30+ archivos** organizados por responsabilidad única
- **0 archivos** con más de 150 líneas (mantenibilidad)
- **100%** nombres en español (autodocumentado)
- **Separación** clara entre lógica, UI y datos

</details>

---

## 🎮 Cómo Usar

| Acción | Resultado |
|--------|-----------|
| 🔍 **Buscar ciudad** | Escribe "Madrid", "Tokyo", "New York"... |
| 📍 **Mi ubicación** | Detecta tu clima automáticamente |
| 📊 **Ver gráficos** | Temperatura y humedad por horas |
| 📅 **Pronóstico** | Clima de los próximos 5 días |

---

## 🎨 Componentes Destacados

### 🧩 Componentes Comunes (7)
```
BotonPrincipal → CampoTexto → Tarjeta → Cargador
MensajeError → Encabezado → PiePagina
```

### 🌡️ Componentes de Clima (4)
```
TarjetaClimaPrincipal → DetallesClima
ItemDetalle → InfoSolarPrincipal
```

### 🎣 Hooks Personalizados (3)
- `useClima()` - Gestiona datos del clima actual
- `usePronostico()` - Maneja pronósticos extendidos
- `useGeolocalizacion()` - Detecta ubicación del usuario

---

## 🚀 Scripts Disponibles

```bash
npm run dev      # 🔥 Desarrollo con hot-reload
npm run build    # 📦 Build de producción
npm run preview  # 👀 Preview de la build
```

---

## 🎯 Características Técnicas

✅ **Arquitectura modular** - Fácil de mantener y escalar  
✅ **Custom Hooks** - Lógica reutilizable y testeable  
✅ **Transformadores de datos** - API limpia → UI amigable  
✅ **Validaciones** - Entradas seguras y confiables  
✅ **Responsivo** - Funciona en móvil, tablet y desktop  
✅ **Optimizado** - Carga rápida y rendimiento fluido  

---

## 📝 Próximas Mejoras

- [ ] 🌙 Modo oscuro/claro
- [ ] 🗺️ Mapa interactivo del clima
- [ ] 🔔 Alertas meteorológicas
- [ ] 💾 Guardar ciudades favoritas
- [ ] 🌐 Multi-idioma

---

<div align="center">

### 🌟 ¿Te gusta el proyecto?

**¡Dale una estrella ⭐ y compártelo!**

---

Hecho con ❤️ usando React + TailwindCSS

[⬆️ Volver arriba](#-weathernow)

</div>
