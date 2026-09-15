# Constitución — WeatherNow

Principios innegociables. Toda spec, plan y tarea debe cumplirlos. Si un
principio entra en conflicto con una petición, se detiene el trabajo y se
pregunta antes de continuar.

---

## 1. La spec manda

Ningún comportamiento se implementa si no está en la spec activa. Si falta una
decisión, se para y se pregunta. El código existente que contradice la spec se
trata como deuda a corregir, no como fuente de verdad.

**Cómo se verifica:** cada PR/tarea referencia el `RF-x` que implementa y deja
la spec actualizada en el mismo cambio.

## 2. El código dice la verdad

- Sin datos falsos, duplicados ni *placeholders* disfrazados de dato real.
- Sin configuración muerta (ficheros/librerías que ya no aplican).
- El README describe lo que el proyecto **hace hoy**, no lo que se desea.
- Los errores se comunican de forma específica (401 ≠ 404 ≠ 429 ≠ red), nunca
  como un mensaje genérico que oculta la causa.

**Cómo se verifica:** revisión de la spec contra el código; un hallazgo de
"el README miente" es un bug de severidad alta.

## 3. Los secretos no viven en el cliente

Ninguna clave de API real se commitea ni se sirve al navegador. La configuración
sensible vive en variables de entorno del servidor. A partir de la spec 002,
todas las llamadas a proveedores externos pasan por un proxy.

**Cómo se verifica:** no hay literales de clave en `src/`; el bundle generado no
contiene `appid`; el repositorio no incluye `.env` (solo `.env.example`).

## 4. La calidad es una puerta

- `npm run typecheck` y `npm run build` deben pasar antes de dar una tarea por
  hecha.
- La lógica con invariantes (formateadores, validadores, zona horaria, motor de
  decisión) tiene tests unitarios. No se avanza con tests en rojo.
- CI ejecuta typecheck + build + tests.

**Cómo se verifica:** los scripts del proyecto en verde y ejecutados en CI.

## 5. Núcleo separado de la interfaz

La lógica de negocio (transformación de datos, cálculo de veredictos, zona
horaria, caché) vive en módulos puros y testeables sin renderizar React. Los
componentes solo presentan. Los hooks orquestan estado y efectos.

**Cómo se verifica:** los módulos de `utilidades/` y `dominio/` se testean sin
montar componentes.

## 6. Idioma y accesibilidad

- Identificadores, comentarios, mensajes de UI y documentación en **español**,
  coherente con el código existente.
- Toda acción e información tiene alternativa no visual: iconos con texto/`aria`,
  labels en formularios, `aria-live` en carga y errores, foco visible.

**Cómo se verifica:** revisión de a11y básica y pruebas con teclado/lector.

---

## Flujo SDD

Constitución → Spec → Clarificación → Plan → Tareas → Implementación (una tarea
cada vez, tests primero) → Validación → Cambio (primero la spec, luego el código).

Artefactos:

```
docs/constitution.md          # este archivo
AGENTS.md / CLAUDE.md         # contexto y reglas para el agente
specs/NNN-nombre/spec.md      # requisitos en notación EARS
specs/NNN-nombre/plan.md      # cómo se implementa
specs/NNN-nombre/tasks.md     # tareas verificables
```
