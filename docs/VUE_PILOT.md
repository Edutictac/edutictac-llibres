# Interfaz Vue de EduTicTac Llibres

La migración iniciada en la bandeja docente y la estantería se completa en la
interfaz interactiva propia. Una sola aplicación Vue sustituye los controladores
de DOM de `public/app.js`. Se conserva este nombre de documento para mantener los
enlaces del primer piloto.

## Componentes

| Archivo | Responsabilidad |
| --- | --- |
| `src/App.vue` | Portada, idioma, entradas de archivos, avisos y montaje común |
| `src/workshop.js` | Operaciones de libros, guardado, coordinación de eXe y estado visible |
| `src/CreateDialog.vue` | Título y plantillas, validación y creación |
| `src/WorkshopView.vue` | Listado de páginas, título, estado de guardado y herramientas |
| `src/ReaderDialog.vue` | Lectura local, navegación, SVG saneado y descargas |
| `src/ImagePicker.vue` | Diálogo de imágenes y selector central de Rebost incrustado |
| `src/SharedStories.vue` | Búsqueda, paginación, catálogo público y visor aislado |
| `src/PublicationDialog.vue` | Acceso, formulario, consentimiento, envío, actualización y retirada |
| `src/reviews/*.vue` | Bandeja docente, lectura privada y decisiones |
| `src/shelf/*.vue` | Libros locales, fechas, orden, contador y borrado confirmado |

`public/app.js` solo inicia `mountLlibres()` de `public/ui.js`. El HTML mantiene
un único punto de montaje `#app`. Se retiran los instaladores separados de las
primeras islas Vue. No hay router, Pinia ni un segundo runtime.

El idioma y el estado de operación se comparten desde `workshop.js`. Los
componentes declaran textos, eventos, campos y estados habilitados en sus
plantillas; no se traducen ni modifican desde un controlador de DOM externo.
Los diálogos continúan siendo nativos, con límites de campos, navegación por
teclado y mensajes de estado. Cerrar una publicación pendiente restaura el editor
al acabar su operación, y el foco vuelve al diálogo después de preparar la portada.

## Límites con el motor, almacenamiento y servicios

eXeLearning 4.0.5 y `public/adapter.js` conservan su implementación. El lienzo
Fabric continúa siendo el que aporta eXe. Vue no controla su árbol de DOM ni
convierte en proxies el motor, los objetos de escenas o los binarios `.elpx`.
La manipulación directa de DOM se limita a hosts de componentes externos,
inserción del SVG previamente saneado, foco y acciones del navegador como copiar
o descargar. No se usa `v-html` para contenido del libro.

La estantería usa `shallowRef` y sigue leyendo `edutictac-llibres-v1`. No cambia
el esquema, puerto u origen de IndexedDB, ni el formato del proyecto. Guardar es
una operación explícita: no se añaden sincronización ni autoguardado. Un fallo al
guardar conserva el editor abierto y no anuncia éxito.

Los módulos locales de almacenamiento, importación, Rebost y publicación se
importan sin duplicarlos en el bundle. No se modifican las API de Commons o del
banco. La sesión, los roles, la relación con el aula y las cuotas siguen
comprobándose en el servidor; Vue solo presenta el flujo autorizado.

La publicación mantiene consentimiento obligatorio, `If-Match` y separación
entre envío privado y aprobación pública. Se descartan respuestas de listados o
preparaciones de publicación que ya se han cerrado. Los visores conservan sus
sandbox: público sin scripts; revisión privada sin scripts y con el origen
necesario para leer imágenes con la sesión docente.

El selector de Rebost mantiene la validación de origen, ventana, identificador
de petición y contexto del libro/página antes de insertar una selección. Cerrar
o cambiar la selección cancela la descarga en curso. Las imágenes se incorporan
al proyecto con sus créditos, usando las comprobaciones existentes.

## Compilar y reproducir

Node `^20.19.0 || >=22.12.0`, según Vite fijado:

```sh
npm ci --ignore-scripts
npm run build
python3 scripts/source-archive.py
```

El bundle `public/ui.js` se versiona para mantener el arranque estático:
`python3 scripts/bootstrap.py` y `docker compose up -d`. Node se usa al desarrollar,
no en el contenedor ni en el navegador. El mismo nginx entrega los archivos sin
CDN, servicios nuevos o claves. El ZIP de fuentes incluye `src/`, configuración,
manifiestos, lockfile y bundle; excluye dependencias instaladas y datos personales.

## Dependencias y licencias

| Componente | Versión fijada | Uso | Licencia |
| --- | --- | --- | --- |
| Vue | 3.5.44 | Runtime local y compilador de componentes | MIT |
| Vite | 8.3.5 | Compilación, solo desarrollo | MIT |
| @vitejs/plugin-vue | 6.0.10 | Compilar `.vue`, solo desarrollo | MIT |

No se añaden dependencias respecto al piloto. Las integridades y dependencias
transitivas están en `package-lock.json`. El aviso MIT de Vue y sus módulos de
runtime se conserva en `public/licenses/vue-MIT.txt`, enlazado desde «Sobre
Llibres y licencias». El código propio sigue bajo AGPL-3.0-or-later.

Referencias oficiales:
[adopción gradual](https://vuejs.org/guide/extras/ways-of-using-vue.html),
[componentes](https://vuejs.org/guide/scaling-up/sfc.html),
[Vite library mode](https://vite.dev/guide/build.html#library-mode).

## Validación y mantenimiento

Las pruebas del editor, IndexedDB, importación/exportación, créditos, publicación
y permisos conservan sus selectores y recorridos. Se añaden plantillas álbum y
blanca, controles de páginas, navegación del lector y Escape, búsqueda y
paginación públicas, textos inertes, respuesta tardía tras cerrar y cierre de
publicación mientras carga. Resultados en [VALIDATION.md](VALIDATION.md).

Se conserva la aplicación independiente con conectores opcionales. Completar la
interfaz Vue no implementa audio, nuevas funciones de IA, sincronización ni
relaciones de aula adicionales. Las actualizaciones de eXe todavía requieren
verificar el adaptador fijado a su versión.
