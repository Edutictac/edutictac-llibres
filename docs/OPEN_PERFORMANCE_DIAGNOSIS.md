# Diagnóstico: apertura lenta de un libro

Fecha: 23-10-2026. Estado: **diagnóstico únicamente, sin cambios de código**.
Pendiente de abordar más adelante.

## Síntoma

Al abrir un libro guardado en «Mis libros» el editor parece cargar el proyecto
varias veces o «reintentar». Ocurre especialmente con los libros creados
durante las pruebas. No hay un error visible ni un reintento real: son varias
inicializaciones consecutivas del mismo editor.

## Conclusión

El flujo lento **es anterior al modo cómic**: `open()` no ha cambiado desde el
commit inicial `039268d`. El cómic solo hace más costosa cada reinicialización
(grupos Fabric, marcos, bafles e imágenes). La causa está en el guardado y la
sincronización de créditos que se ejecutan al abrir y al cambiar de página.

## Flujo actual al abrir

`src/workshop.js:191` (`openStored`) monta el iframe del motor y llama a
`public/adapter.js:621` (`open`):

1. `OPEN_FILE` del `.elpx`.
2. `showPage()` + `edit()`: primera carga de página e inicialización del
   iDevice.
3. `flush()` (`adapter.js:124`): guarda la página actual y ejecuta
   `syncCredits()`.
4. `syncCredits()` (`adapter.js:352`) puede volver a cargar páginas:
   - recorre todos los content pages y, si detecta créditos heredados, hace
     `showPage()` + `edit()` + `flush()` por cada una (`adapter.js:356-368`);
   - si regenera la página de créditos, repite otro ciclo
     (`adapter.js:398-402`).
5. `showPage()` + `edit()` otra vez (`adapter.js:626-627`): segunda
   inicialización visible del editor.

Además, `select()` (`adapter.js:420`) llama a `flush()` completo en **cada
cambio de página**, por lo que la sincronización de créditos se repite al
navegar, no solo al abrir.

La sensación de «reintento» viene de estas inicializaciones secuenciales, no de
una lógica de reintentos: en el código propio no existe ninguna.

## Causas concretas

1. **Guardar y sincronizar al abrir**: no hay cambios pendientes que guardar,
   pero `open()` hace `flush()` + `syncCredits()` y después vuelve a editar.
2. **Sincronización en cada selección**: `select()` usa `flush()` con
   `sync=true`; el coste se paga en cada pestaña de página.
3. **Heurística de créditos heredados demasiado amplia**: cualquier objeto de
   texto que contenga `" · "` se considera crédito antiguo
   (`adapter.js:363`), no solo los marcadores reales `rebostCreditId` /
   `rebostCreditsFooter`. Un libro de pruebas puede entrar siempre en el camino
   lento y recargar páginas.
4. **Parseo repetido de todas las páginas**: `contentPages()`,
   `isCreditsPage()` y `comicInfo()` hacen `JSON.parse` del `jsonProperties` de
   todas las páginas varias veces por refresco
   (`adapter.js:303-309`, `adapter.js:536`).
5. **Iframe del motor recreado en cada apertura**: `mount()`
   (`src/workshop.js:154`) crea un iframe nuevo y recarga todo eXe; el nginx
   sirve `/engine/` con `Cache-Control: no-cache`, con lo que se revalidan
   muchos recursos.

## Cómo confirmarlo (medición previa)

Instrumentación temporal, solo con `?debug=1`, contando y cronometrando:

- `OPEN_FILE`;
- llamadas a `showPage()`;
- `edit()` / `loadInitScriptIdevice("edition")`;
- `flush()` y `c.save()`;
- `syncCredits()` y cada recarga de página que provoca.

Reproducir con: copia del cómic de muestra, copia del cuento de muestra y un
libro de pruebas real exportado a `.elpx`.

Objetivo medible después del arreglo: **1 carga de página + 1 inicialización de
editor** al abrir, sin recargas adicionales.

## Plan propuesto

### Fase 1 — Abrir una sola vez

- [ ] En `open()`, quitar `flush()`, `syncCredits()` y el segundo
      `showPage()` + `edit()`.
- [ ] La página de créditos ya viene guardada; reparar orden o duplicados solo
      con metadatos, sin recargar páginas.

### Fase 2 — Separar guardar de sincronizar créditos

- [ ] Dividir `flush()` en `saveCurrent()` (guardar iDevice y cambiar modo) y
      `syncCredits()`.
- [ ] `select()`, `move()`, `rename()` y `open()` usan solo `saveCurrent()`.
- [ ] `syncCredits()` queda para guardar, exportar, añadir/borrar página o
      imagen y publicar.

### Fase 3 — Migración heredada fiable y una sola vez

- [ ] Sustituir el disparador genérico `" · "` por marcadores reales
      (`rebostCreditId`, `rebostCreditsFooter`) validados contra los adjuntos
      `.rebost.txt`.
- [ ] Si hay migración real, ejecutarla una vez y persistirla; que no se repita
      al reabrir.
- [ ] Probar que `previous` vs `entries` no regenera la página de créditos si no
      ha cambiado.

### Fase 4 — Evitar parseos repetidos

- [ ] Caché por página del `jsonProperties` ya parseado, invalidada al
      actualizar un componente o recibir cambios Yjs.
- [ ] Usarla en `contentPages`, `isCreditsPage`, `comicInfo` y publicación.

### Fase 5 — Pruebas

- [ ] Test de navegador que instrumente `loadInitScriptIdevice` / `edition` y
      cuente recargas al abrir: cómic y cuento = 1 carga.
- [ ] Libro con créditos heredados: migración una vez y segunda apertura sin
      recargas.
- [ ] Suite completa y recorrido manual en local `:8098`.

### Fase 6 — Opcional, en otra fase

- [ ] Reutilizar el iframe del motor entre aperturas para no recargar todo eXe.
- [ ] Revisar el `Cache-Control` de `/engine/`.

## Decisiones pendientes

1. ¿La migración de créditos antiguos se difiere al primer guardado
   (recomendado, apertura rápida) o se hace una única vez al abrir?
2. ¿La reutilización del iframe del motor se incluye aquí o se deja para otra
   fase (recomendado)?
3. Falta un `.elpx` exacto de los libros de prueba que fallan para reproducir el
   número de recargas. Confirmar también si ocurre en producción o en local.

## Criterios de aceptación

- Abrir un libro nuevo o de muestra hace una sola carga de página y una sola
  inicialización del editor.
- Cambiar de página no dispara `syncCredits()` ni recargas de otras páginas.
- La migración de un libro antiguo se ejecuta como máximo una vez y queda
  persistida.
- No se modifica el núcleo de eXe (`vendor/` intacto).
- Créditos finales, cómic, Rebost, publicación y exportaciones siguen pasando
  las pruebas existentes.

## Referencias

- `public/adapter.js`: `flush` (124), `edit` (138), `recoverLegacyCredits`
  (205), `isCreditsPage` (303), `contentPages` (308), `showPage` (311),
  `syncCredits` (352), `select` (420), `comicInfo` (536), `open` (621).
- `public/credits.js`: `sceneObjects`, `collectCredits`, `migrateCredits`.
- `src/workshop.js`: `refreshPages` (111), `mount` (154), `openStored` (191),
  `select` (237).
