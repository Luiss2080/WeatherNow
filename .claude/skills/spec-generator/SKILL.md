---
name: spec-generator
description: Usa esta skill cuando el usuario pida crear, redactar o revisar una especificación (spec) de una funcionalidad en WeatherNow. Guía una entrevista de requisitos y produce un spec.md siguiendo la plantilla del equipo.
---

# Generador de specs — WeatherNow

Convierte una idea vaga en una especificación acordada. La spec es el contrato:
si algo no está aquí, no se implementa.

## Proceso

1. **Lee el contexto.** `docs/constitution.md` y las specs previas de `specs/`
   para respetar convenciones y no contradecir lo ya acordado.
2. **Entrevista al usuario.** Preguntas de **UNA en UNA**, máximo 6, esperando
   respuesta antes de la siguiente. Céntrate en casos límite, comportamiento
   ante errores y qué queda fuera. No propongas soluciones técnicas.
3. **Elige el número.** Mira `specs/` y usa el siguiente libre con tres
   dígitos: `specs/NNN-<nombre-en-kebab-case>/spec.md`.
4. **Redacta** usando `spec-template.md` de esta skill, sin saltarte secciones.
   Criterios de aceptación **siempre en notación EARS**, numerados como RF-1,
   RF-2, … Cada requisito debe ser verificable.
5. **Marca lo que no sepas** como `[NECESITA ACLARACIÓN: pregunta concreta]`.
6. **Pide aprobación explícita** al terminar. No pases al plan ni escribas
   código hasta tenerla.

## Reglas

- La spec describe **QUÉ** y **POR QUÉ**. Stack, arquitectura, nombres de
  archivos, esquemas de datos y algoritmos van en el plan.
- Incluye **siempre** la sección "Fuera de alcance".
- Un requisito, una frase.
- Sin adjetivos no medibles: escribe el umbral o no lo escribas.
- Idioma: español (ver `docs/constitution.md`).

## Notación EARS

| Patrón | Forma | Cuándo |
|---|---|---|
| Ubicuo | EL SISTEMA \<hará\> | siempre cierto |
| Dirigido por evento | CUANDO \<disparador\>, EL SISTEMA \<hará\> | responde a algo |
| Estado | MIENTRAS \<estado\>, EL SISTEMA \<hará\> | durante una condición |
| Opcional | DONDE \<característica\>, EL SISTEMA \<hará\> | solo si está presente |
| No deseado | SI \<condición\>, ENTONCES EL SISTEMA \<hará\> | errores y casos límite |

Ejemplo correcto:

> RF-4: SI el nombre ya existe (ignorando mayúsculas y espacios exteriores),
> ENTONCES EL SISTEMA no creará un duplicado e informará del conflicto.

## Al revisar una spec existente

No reescribas: **detecta y lista**, numerado, en cuatro bloques — (1)
ambigüedades, (2) contradicciones, (3) casos límite no cubiertos, (4) conflictos
con la constitución.
