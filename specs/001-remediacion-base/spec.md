# Spec 001 — Remediación base: el código dice la verdad

## Contexto y objetivo

Una auditoría del repositorio (2026-09) reveló que, en un clon limpio, el
proyecto **no arrancaba ni compilaba**: React no estaba declarado, no había
plugin de React para Vite, la configuración de Tailwind era de la versión 3
sobre Tailwind 4 y `tsc` fallaba por no configurarse para ficheros `.jsx`.
Además había un `ReferenceError` en la tarjeta de detalles y varios
comportamientos que ocultaban la verdad (errores genéricos, zona horaria
incorrecta, dato duplicado en un gráfico, README desactualizado).

El objetivo de esta spec es dejar el proyecto **verificable, honesto y
funcional** (estado mínimo de producción) antes de construir el MVP con valor
comercial de la spec 002. Esta spec **no añade funcionalidad nueva** más allá de
la corrección de los defectos.

## Usuarios / actores

- **Desarrollador/a** que clona el repositorio y espera poder ejecutarlo.
- **Usuario final** que consulta el clima y merece errores claros y datos fieles.
- **Mantenedor/CI** que necesita una puerta de calidad automática.

## Historias de usuario

- H1: Como desarrollador/a quiero `npm install && npm run dev` funcione en un
  clon limpio para empezar a trabajar sin fricción.
- H2: Como desarrollador/a quiero que `npm run build` y `npm run typecheck`
  pasen para integrar cambios con confianza.
- H3: Como usuario quiero saber **por qué** falla una búsqueda (ciudad, clave,
  límite, red) y no un mensaje genérico.
- H4: Como usuario quiero que las horas mostradas correspondan a la ciudad
  consultada y no a mi dispositivo.
- H5: Como usuario quiero que la interfaz no se rompa al mostrar los detalles.

## Requisitos funcionales (criterios de aceptación en EARS)

### Puesta en marcha y build

- **RF-1**: EL SISTEMA DEBE declarar en `package.json` todas sus dependencias
  directas (`react`, `react-dom`) y las de desarrollo necesarias para compilar
  JSX (`@vitejs/plugin-react`), de modo que `npm install` instale exactamente lo
  que la app usa.
- **RF-2**: EL SISTEMA DEBE compilar con `npm run build` (`tsc --noEmit &&
  vite build`) sin errores en un clon limpio.
- **RF-3**: EL SISTEMA DEBE aplicar Tailwind CSS 4 con la configuración
  soportada por esa versión (`@tailwindcss/postcss` y `@import "tailwindcss"`),
  sin ficheros de configuración obsoletos.
- **RF-4**: CUANDO se ejecuta `npm run dev`, EL SISTEMA DEBE servir la SPA y
  renderizar la pantalla inicial sin errores de consola.

### Corrección de datos y presentación

- **RF-5**: CUANDO se renderiza la tarjeta de detalles, EL SISTEMA DEBE mostrar
  la temperatura mínima y máxima sin lanzar `ReferenceError`.
- **RF-6**: SI el pronóstico no incluye la sensación térmica por franja,
  ENTONCES EL SISTEMA NO DEBE inventar ni duplicar la serie de temperatura como
  si fuera sensación; mostrará únicamente datos reales.
- **RF-7**: CUANDO se muestra una hora (amanecer, atardecer, franjas del
  pronóstico) asociada a una ciudad, EL SISTEMA DEBE calcularla usando el
  desplazamiento horario (`timezone`) devuelto por la API, no la zona del
  dispositivo.
- **RF-8**: CUANDO el usuario cambia de ciudad, EL SISTEMA DEBE descartar las
  respuestas de peticiones anteriores y no mostrar datos de una búsqueda previa.

### Errores y diagnóstico

- **RF-9**: SI la API responde 404, ENTONCES EL SISTEMA DEBE informar "ciudad no
  encontrada". SI responde 401/403, DEBE informar un problema de configuración.
  SI responde 429, DEBE informar que se superó el límite de peticiones. SI la
  petición expira o falla la red, DEBE informar un problema de conexión.
- **RF-10**: SI falla la obtención del pronóstico, ENTONCES EL SISTEMA DEBE
  mostrar el error al usuario (no solo el error del clima actual).
- **RF-11**: SI el usuario deniega o falla la geolocalización, ENTONCES EL
  SISTEMA DEBE mostrar el motivo y permitir buscar por ciudad.

### Configuración y secretos

- **RF-12**: EL SISTEMA NO DEBE commitear claves de API reales; la configuración
  DEBE leerse de variables de entorno documentadas en `.env.example`.
  (La protección frente al navegador se resuelve en la spec 002 con el proxy.)

### Calidad automatizada

- **RF-13**: EL SISTEMA DEBE ejecutar tests unitarios (`npm test`) que cubran los
  invariantes de formateadores, validadores, transformadores, zona horaria y
  manejo de errores HTTP.
- **RF-14**: EL SISTEMA DEBE ejecutar análisis estático (`npm run lint`) sin
  errores y sin imports/variables sin usar.

## Requisitos no funcionales

- **Rendimiento**: el *chunk* JS inicial no debe superar los 500 kB (hoy ~654 kB);
  se aplicará *code-splitting* de los gráficos.
- **Accesibilidad**: los controles tienen nombre accesible; errores y estados de
  carga se anuncian con `aria-live`; el foco es visible.
- **Plataformas**: navegadores *evergreen* y móvil.
- **Idioma**: interfaz y documentación en español.
- **Mantenibilidad**: ningún fichero de componente supera ~150 líneas.

## Casos límite

- Nombre de ciudad vacío, de 1 carácter o con espacios sobrantes.
- Ciudad inexistente (404) y ciudad ambigua con homónimos entre países.
- Respuesta de la API con campos ausentes (`main`, `wind`, `sys`, `weather`).
- Coordenadas fuera de rango.
- Peticiones solapadas al cambiar de ciudad rápido.
- Ejecución sin conexión o con timeout.
- Ejecución sin API key configurada.

## Fuera de alcance

- Backend/proxy, motor de decisiones, favoritos, alertas y planes de pago
  (spec 002).
- Cuentas de usuario y persistencia remota.
- Internacionalización a idiomas distintos del español.
- Modo oscuro y PWA (se reevalúan en spec 002).

## Criterios de finalización

- `npm install` + `npm run build` + `npm run typecheck` en verde desde un clon
  limpio.
- `npm test` y `npm run lint` en verde (RF-13, RF-14).
- Recorrido manual: buscar una ciudad válida, una inexistente y usar "Mi
  ubicación" denegando permiso, con mensajes correctos en cada caso.
- El README describe el estado real del proyecto.

## Dudas abiertas

- [NECESITA ACLARACIÓN] ¿Se mantiene TypeScript solo como `typecheck` sobre
  `.jsx` (situación actual) o se migra el código a `.ts/.tsx`?
- [NECESITA ACLARACIÓN] ¿Se conserva `axios` o se migra a `fetch` nativo para
  reducir dependencias y superficie de vulnerabilidades?
