# Primera versión usable: verificación local

## Lector compartit de mostres i taller — 23-10-2026

24 proves locals correctes; 23 correctes i 1 omesa en el candidat VPS. Lectura
de conte/còmic sense còpia, retorn amb Escape, enllaços antics, descàrrega editable
i lectura/exportació dels llibres del taller comprovades. La comparació d'imatges
del contingut del lector entre mostra i editable conserva dimensions i diferència
mitjana inferior a 1/255 per canal; tots dos recorreguts usen el mateix component.

Verificació pública: 23/24 correctes inicialment; el cas restant va esgotar el
timeout descarregant traduccions de Rebost i passa en repetir-lo (HTTP 200,
121212 bytes, 0,22 s amb curl). No es modifica el proxy ni s'utilitzen comptes reals.

## Mode còmic — 23-10-2026

78 proves correctes en el frontal aïllat, 26 omissions de perfils opcionals;
exportació específica del còmic a HTML i EPUB correcta. Les comprovacions
inclouen les tres plantilles, marcs protegits, col·locació a la vinyeta triada,
text agrupat, edició i desfer/refés, límit de text sense perdre l'esborrany,
descàrrega/reimportació i publicació amb Rebost i crèdits en API temporal.

El descriptor de grup Fabric admés té proves negatives per a classes,
estratègies i propietats addicionals no permeses. Els llibres anteriors,
idiomes, crèdits, estanteria i el circuit de revisió continuen passant.
La prova antiga de crèdits restaura ara el mapa XML global per a no alterar
la serialització SVG de les proves de publicació següents.

Candidat VPS: 18 correctes, 1 omesa per ser exclusiva d'HTTPS. Sobre HTTPS
públic: **27 correctes en 124,95 s**, amb Rebost real i cap compte personal.
Dos avisos de dependències ja existents en la verificació pública.
Detalls operatius en [PRODUCTION.md](PRODUCTION.md) i d'ús en
[COMIC_MODE.md](COMIC_MODE.md). La nova versió està publicada.

## Historial anterior

21-10-2026. Prueba independiente autorizada por el usuario: sin Commons, Rebost
o autenticación. El manejo desde iPad no es prioritario; se valida en ordenador.

## Resultado

- `python -m pytest -q tests`: **12 aprobadas**, 37,86 s.
- Recorrido completo adicional usando `LLIBRES_TEST_URL=http://100.74.151.108:8098`:
  **1 aprobado**, 15,03 s, en navegador con origen HTTP sin contexto seguro.
- Petición desde el Mac de la Tailnet a `http://100.74.151.108:8098/`: **HTTP 200**.
- nginx: configuración válida y contenedor `healthy`.
- Sintaxis JavaScript y Python comprobada; capturas de portada, editor y lector
  en valenciano revisadas visualmente.
- SHA-256 de la distribución y comparación de index, bundle e iDevice con el
  ZIP oficial: archivos upstream intactos.

## Recorridos comprobados

En castellano y valenciano, con Chromium real:

1. Crear plantilla de tres páginas y escribir en el lienzo usando entrada de teclado.
2. Incorporar PNG del dispositivo, dibujar con ratón y volver a selección.
3. Guardar y conservar texto, transparencia, imagen y trazos.
4. Añadir página, reordenarla y leer el libro con navegación.
5. Descargar `.elpx`, volver a la estantería, recargar navegador y reabrir.
6. Abrir la descarga en otro contexto sin datos previos: imagen y trazo reeditables.
7. Generar HTML con recursos locales y EPUB con estructura y mimetype correctos.

Comprobaciones adicionales:

- Rutas ZIP peligrosas, enlaces simbólicos, tamaño expandido excesivo, scripts
  y entidades XML externas rechazados.
- El paquete de entrada se reconstruye sin código de temas, iDevices o HTML
  proporcionado por el archivo importado.
- El título con apariencia de HTML se mantiene como texto, sin ejecutar eventos.
- Ante falta de espacio simulada en IndexedDB no se abandona el libro ni se
  anuncia que está guardado; se conserva la copia anterior.

## Límites de esta verificación

No se ha validado iPad físico, EPUBCheck, lectura EPUB en aplicaciones externas,
SCORM o una auditoría completa de seguridad de eXeLearning. El EPUB se considera
experimental. La accesibilidad de páginas SVG requiere evolución semántica.

El taller guarda explícitamente en el navegador y permite descargar copias;
no tiene sincronización ni guardado automático durante la escritura. Algunas
etiquetas del lienzo upstream permanecen en inglés. El adaptador depende de
APIs internas fijadas a eXeLearning 4.0.5 y sus límites constan en README.

Commons y Blocs permanecen sin cambios. Este trabajo no se ha publicado en un
servidor externo ni se ha creado un repositorio remoto; está disponible en el
laboratorio local/Tailnet como `edutictac-llibres-preview`.

## Ampliación: conexión opcional a Rebost (21-10-2026)

Autorizada después de la prueba independiente. Está activada en el laboratorio
con `compose.rebost.yml`, conservando el origen y puerto 8098. La configuración
base sigue sin depender de Commons. No se cambian archivos de producción de
Commons, Blocs ni eXeLearning.

Comprobaciones completadas:

- Las 12 pruebas anteriores siguen pasando; se añaden 7 recorridos de selector
  y portabilidad: **19 aprobadas**, 78,88 s.
- 4 comprobaciones contra el nginx real: sesión anónima rechazada con 401;
  POST, PATCH y DELETE bloqueados con 403; scripts de traducción independientes.
- Repetición final tras ajustar la resolución DNS del proxy y los límites del
  adjunto: los 11 tests de Rebost y proxy aprobados en 41,52 s. Los 3058 archivos
  del motor coinciden byte a byte con el ZIP oficial; sintaxis JS validada.
- Selector real del Rebost y motor eXe reales, con respuestas de API sintéticas
  aisladas en cada contexto de navegador. No se usan credenciales ni imágenes de
  usuarios reales. Personajes en castellano y fondos en valenciano; apertura desde
  el botón de galería original de Slides.
- Imagen, crédito visible, procedencia, licencia completa y fuente como texto
  inerte conservados en `.elpx`, HTML y EPUB. Reapertura en contexto nuevo con
  acceso a API de Rebost bloqueado: imagen editable y créditos conservados.
- Cambio de revisión durante la lectura e imagen PNG falsa rechazados sin
  alterar los objetos de la página. Mensajes de origen, ventana o petición
  incorrectos y respuestas a un selector cerrado ignorados.
- Sesión caducada muestra acceso a Commons en otra pestaña; modo sin conector
  abre el selector del dispositivo desde el mismo botón de Slides.
- Detectada y corregida una carrera del adaptador: el motor publica su API antes
  de terminar de hidratar las imágenes. Se descarta la API destruida y se espera
  a que se carguen los objetos antes de guardar. Se comprueba solo al montar cada
  lienzo, sin bloquear ediciones posteriores.
- Desde el Mac de la Tailnet, portada y `/assets/` devuelven HTTP 200. Captura
  sintética `artifacts/rebost-picker-va.png` revisada visualmente.

La inserción autenticada con una cuenta real queda para la prueba manual del
usuario. Los tests no validan un acceso OIDC interactivo real. Se conservan los
límites de EPUB y accesibilidad de la primera prueba.

## Catálogos públicos y créditos automáticos (21-10-2026)

El usuario autoriza leer los catálogos sin cuenta; la sesión queda reservada para
la biblioteca personal. La API y el selector central se actualizan en Commons y
se activan localmente conservando sus volúmenes, sesiones y configuración de acceso.
El cambio de política sustituye las expectativas anteriores de 401 para catálogos.
`/me`, `mine` y los archivos personales mantienen sus controles.

- Commons: **63 pruebas aprobadas**, 140,41 s. Incluyen biblioteca privada,
  acceso individual, catálogos, Scratch, familias y navegador es/va.
- Llibres: **27 pruebas aprobadas**, 108,08 s. Incluyen la selección de una imagen
  real del catálogo Scratch sin cuenta a través del proxy instalado, guardado,
  selector privado con acceso de Commons, y bloqueo de escrituras del proxy.
- Prueba con cuatro imágenes y tres créditos largos: orden alfabético, saltos de
  línea medidos por Fabric, deduplicación, eliminación de imagen, geometría dentro
  del escenario, reapertura y lectura. Crédito único al pie de cada diapositiva.
- Compatibilidad con etiquetas de crédito anteriores que perdían sus metadatos:
  recuperación desde los adjuntos de atribución, sin ejecutar sus fuentes.
- El adaptador registra `slideMeta`, `slideAssetUrl` y `slideAssetName` como
  propiedades personalizadas de Fabric. Los archivos del motor no se modifican.
- Captura sintética `artifacts/credits-reader-va.png` revisada visualmente.
- Peticiones desde el Mac de la Tailnet: catálogo HTTP 200; biblioteca privada
  anónima HTTP 401. Commons saludable y Llibres `healthy`.

El alojamiento y la publicación de libros en el banco solo se han investigado y
documentado en `RESOURCE_PUBLICATION.md`; no se han implementado ni publicado libros.

## Preferencia confirmada: una diapositiva final de créditos

21-10-2026. El usuario pide reunir los créditos en una página aparte al final del
libro. Este cambio sustituye el bloque al pie de cada diapositiva.

- Suite completa de Llibres: **28 aprobadas**, 132,88 s.
- Los créditos de varias páginas se agrupan, ordenan y deduplican en una única
  diapositiva nativa «Créditos» / «Crèdits», siempre después de la historia.
- Añadir páginas las coloca antes de los créditos; estos no se pueden mover,
  renombrar, borrar o editar manualmente desde el taller.
- Eliminar una imagen o una página recalcula la atribución sin perder créditos
  de imágenes todavía utilizadas en otras páginas. Sin imágenes con atribución,
  desaparece la página automática.
- Los pies y etiquetas antiguos se trasladan; se preservan las atribuciones
  antiguas que no se puedan asociar con certeza a una imagen.
- Guardar/reabrir conserva una sola página final. El lector muestra la historia
  sin créditos superpuestos y termina con la página de atribuciones.
- HTML y EPUB contienen los créditos visibles además de los adjuntos completos
  de licencia y procedencia. El importador admite 50 páginas y la adicional final.
- Captura sintética `artifacts/credits-final-va.png` revisada visualmente.

El banco de recursos queda registrado expresamente en `docs/ROADMAP.md`, enlazado
desde README y en la memoria del proyecto. Continúa pendiente de implementar.


## Publicación opcional en el banco: implementada

21-10-2026. Sustituye el estado pendiente de los apartados anteriores.

- Llibres: **31 pruebas aprobadas**, 184,09 s, incluida la regresión completa del
  editor, créditos y conector. Se selecciona el iframe del motor por su contenedor,
  sin depender de la posición de los nuevos visores en la página.
- Banco API: **71 pruebas aprobadas**, 2,39 s. Publicación e índice atómicos,
  actualización estable/idempotente, revisiones, retirada, aislamiento de
  propietarios, cuotas, XSS/SVG activo y rutas ZIP peligrosas rechazadas, tipos
  JSON incorrectos y autenticación malformada sin errores de servidor.
- Commons: **67 pruebas aprobadas**, 151,02 s, de permisos y Rebost; repetición
  focalizada tras separar los métodos OpenAPI y añadir la fuente pública.
- Recorrido real de navegador en es/va contra recursos-api con SQLite temporal:
  publicar con imágenes y créditos, leer en Llibres y en el frontend real del banco,
  ofrecer el editable voluntariamente, actualizar sin duplicar, retirar de ambas
  vistas y reabrir el borrador. Sin cuentas ni publicaciones personales reales.
- Recorrido valenciano repetido tras la activación local: **1 aprobada**, 21,20 s.
  Captura sintética `artifacts/publication-va.png` revisada.
- Local activo: Llibres 8098, banco 8086, portal 8082; catálogos y fuentes HTTP 200,
  biblioteca personal anónima y publicación sin sesión HTTP 401. Vista compartida
  abierta con Chromium por la IP Tailnet, sin sesión. No hay libros reales publicados.
- La nueva comprobación desde el Mac remoto no pudo completarse: SSH agotó el
  tiempo de conexión. Las comprobaciones por IP anteriores son desde el servidor,
  y no sustituyen una prueba desde otro dispositivo.
- Acceso OIDC con cuenta docente real y publicación manual de un libro propio:
  pendientes del usuario; las pruebas automáticas utilizan sesiones sintéticas.

El conector sigue siendo opcional, no cambia los archivos de eXeLearning, no añade
servicios ni bases de datos y no se ha desplegado en servidores remotos.

Comprobación final: los 3058 archivos oficiales de eXe coinciden byte a byte con
el ZIP 4.0.5 fijado. Base de recursos íntegra tras recrear el contenedor: se
conservan esquema y recuentos del índice, publicaciones y archivos. Reinicio
`unless-stopped` habilitado en el override local para los dos servicios del banco.


## Corrección del acceso docente y retorno de publicación

21-10-2026. Incidencia reproducida: el enlace docente de Publicar devolvía al
Rebost; además el wrapper local leía la claim `roles` aunque el proveedor real
expone `groups` (comprobado mediante sus mappings, sin revelar credenciales).

- Commons: 15 pruebas aprobadas en 23,84 s: wrapper conserva claves seleccionadas y
  claim explícita, usa `groups` por defecto, callback con roles/grupos y sesiones
  docentes/alumnado/admin, destino Llibres conservado y permisos/revocación.
- Llibres: 5 pruebas de publicación aprobadas en 57,08 s: publicación y retirada
  anteriores más el acceso de vuelta a Llibres en es/va, sin abrir Rebost y sin
  publicar automáticamente. Repetición de 2 pruebas con el botón real de cerrar
  pestaña y recuperación automática del formulario: 14,04 s.
- Proxy nginx real: conserva el destino de Llibres y también el de Rebost; consulta
  pública y privacidad siguen verificadas tras completar el despliegue.
- Activo en local: API con `groups` y scope `openid profile groups`, nueva página
  de confirmación y JS HTTP 200; acceso anónimo de publicación sigue denegado.

No se han cambiado contraseñas, cuentas ni permisos de usuarios. No se ha iniciado
sesión en nombre de una persona ni se ha publicado un libro real.


## Confirmación visible y descarga técnica discreta

21-10-2026. El estado publicado aparece antes del formulario en un bloque destacado
con lectura/copia del enlace. Tras publicar o actualizar, el diálogo vuelve arriba
y el foco pasa al encabezado de confirmación (anuncio accesible).
Pruebas es/va en pantalla de 720 px de alto: confirmación y copia del enlace dentro
del área visible, actualización con mensaje propio. Dos recorridos aprobados en
41,75 s. La fuente técnica queda en un desplegable cerrado «Sobre este lector y
licencias»; se conserva el editable .elpx. Pruebas API: 20 aprobadas, 1,90 s,
incluida adaptación de lectores publicados anteriormente sin alterar revisiones
ni el contenido del libro. No hay que volver a publicar para ocultar ese enlace.


## Envío del alumnado y revisión docente

21-10-2026. Implementado y activado en local como conexión opcional.

- Suite completa de Llibres: **37 aprobadas**, 221,57 s; incluye regresiones del
  editor, créditos, selector y publicación docente, más revisión del alumnado.
- API del banco: **76 aprobadas**, 3,44 s: copia privada, aislamiento por aula,
  aprobación exacta, revisión obsoleta rechazada, devolución con comentario, nueva
  versión pendiente que conserva la pública anterior, cancelación, retirada,
  cuotas transaccionales, JSON incorrecto y limpieza administrativa de huérfanos.
- Commons: **17 aprobadas**, 28,41 s, de identidad, revocación, roles, wrappers y
  permisos. El navegador no puede elegir ni suplantar propietario, aula o ámbito
  administrativo. Alumnado y docentes ajenos no pueden aprobar ni leer archivos
  privados. Un alumno desactivado no recibe una aprobación posterior.
- Prueba completa es/va mediante HTTP real contra un Commons temporal, con sesión
  de código/PIN y cookie docente sintética en navegadores separados. El transporte
  al banco utiliza su aplicación real y una SQLite temporal. No se usan cuentas ni
  libros personales. Se verifica que una imagen privada del iframe carga con la
  sesión docente real de esa prueba y permanece protegida sin sesión.
- Recorrido valenciano repetido tras los ajustes de interfaz: **1 aprobada**,
  15,80 s. Capturas sintéticas `review-pupil-va.png` y
  `review-teacher-preview-va.png` revisadas visualmente.
- Proxy nginx real: **9 aprobadas**, 8,45 s; conserva los destinos de Llibres y
  Rebost tanto para acceso docente como para código/PIN, además de la privacidad
  y el catálogo sin cuenta.
- Bases locales íntegras; fuentes del servidor activo coinciden con ambos módulos
  de publicación y revisión. API de revisión y solicitudes anónimas denegadas.

Se conservan los borradores y los libros publicados. Aulas y relaciones docentes
no se crean automáticamente. Las cuentas OIDC de alumno requieren un vínculo
posterior con el aula: esta primera versión utiliza código/PIN. La prueba manual
con una pareja de cuentas reales del aula queda pendiente del usuario.

Comprobaciones adicionales: una cookie docente de compatibilidad antigua no
sustituye al revisor individual; la consulta de aulas usa su identidad OIDC.
Los permisos generales de itinerarios conservan su comportamiento (prueba
focalizada aprobada). Los datos de última aprobación se conservan al cancelar o
enviar nuevas revisiones.

## Piloto Vue: bandeja de revisión docente (21-10-2026)

- Suite completa de Llibres: **44 aprobadas**, 225,99 s. Incluye editor,
  almacenamiento, importación/exportación, créditos, Rebost, proxy nginx,
  publicación y revisión docente en castellano y valenciano. Las advertencias
  son de dependencias Python existentes (Authlib/websockets).
- Cinco regresiones nuevas de interfaz: paginación/filtro, traducción reactiva
  y textos inertes; vuelta del acceso y revocación; conflicto de revisión sin
  anunciar éxito ni perder comentario; respuesta tardía tras Escape; IDs de
  recursos inválidos descartados. Ejecución focalizada: **5 aprobadas**, 5,08 s.
- Recorrido HTTP con aula, alumno y docente sintéticos, banco real con SQLite
  temporal e imágenes privadas: **2 aprobadas**, 28,69 s, antes de la suite
  completa. Se conserva confirmación explícita, sandbox sin scripts e If-Match.
- `npm ci --ignore-scripts` y `npm run build`: compilación limpia reproducible
  con el mismo SHA-256 del bundle antes/después de reinstalar dependencias.
  Auditoría npm de esta instalación: cero vulnerabilidades informadas.
- `public/reviews.js`: 89.300 bytes, runtime local de producción sin depender
  de `process.env` en el navegador. No se instala Node en Docker ni se cambia
  el puerto/origen de IndexedDB.
- ZIP de fuentes comprobado: incluye componentes, manifiestos, lockfile,
  configuración y licencia MIT. Captura sintética valenciana de aprobación
  revisada visualmente.
- HTTP 200 en la dirección Tailnet desde el propio host; archivos servidos
  coinciden con los locales. No constituye otra comprobación desde un iPad o
  dispositivo remoto. Prueba manual con cuentas reales pendiente del usuario.

Alcance, reproducción y dependencias: [VUE_PILOT.md](VUE_PILOT.md).

## Estantería Vue y reapertura del editable del banco (21-10-2026)

- Retirados los avisos de «prueba/prova» de la interfaz, la página informativa
  y los mensajes de compatibilidad. Se conserva la nota de almacenamiento local.
- Estantería Vue: contador, orden por fecha, idioma, textos escapados, borrado
  confirmado, recuperación tras fallo y devolución de foco. Pruebas focalizadas:
  **4 aprobadas**, 21,83 s; incluyen abrir, editar, guardar y reabrir en es/va.
- Regresión inicial del editor tras migrar la estantería: **12 aprobadas**,
  40,09 s. Un único bundle `public/ui.js` comparte Vue entre revisión y estantería.
- Incidencia real reproducida: el `.elpx` del banco era correcto, pero la URL
  `http://scratch.mit.edu` dentro del texto de atribución del SVG de créditos
  activaba el rechazo global de URLs. El importador ahora revisa atributos de
  recursos y CSS, permitiendo las direcciones escritas como texto. Los scripts,
  eventos y `foreignObject` continúan rechazados.
- Nueva regresión sintética falla antes del arreglo y pasa después. Once casos
  cubren texto con URL, referencias externas (incluido el dominio W3C fuera de
  declaraciones de namespace), CSS, scripts, eventos y enlaces JavaScript.
- La prueba de publicación ahora reabre en un navegador nuevo el `.elpx` exacto
  entregado por la API del banco, incluyendo una atribución con URL.
- El archivo real publicado también se ha descargado y abierto correctamente
  en un navegador aislado: cuatro páginas y lector funcional. No se modificó
  la publicación ni los libros del navegador del usuario.
- Portada y página informativa revisadas; captura sintética
  `artifacts/vue-shelf-va.png`. Archivos servidos coinciden con el workspace y
  el ZIP de fuentes contiene componentes, bundle compartido y corrección del
  importador. No se han cambiado API, Docker, puerto, motor ni esquema IndexedDB.

Resultado final con ambos cambios: **59 pruebas aprobadas**, 256,99 s.
Incluye los once casos SVG, reapertura desde el banco es/va, estantería Vue,
revisión docente y regresiones del editor. Cuatro avisos de deprecación de las
dependencias Python existentes; ningún fallo.

## Interfaz completa en Vue (21-10-2026)

- **64 pruebas aprobadas**, 277,76 s, con la interfaz completa. Cuatro avisos
  de deprecación de Authlib/websockets ya existentes; ningún fallo.
- Se conservan los recorridos de editor, guardado, importación/exportación,
  créditos, Rebost, publicación y revisión en castellano y valenciano.
- Nuevas pruebas: plantillas álbum/blanca, título vacío, controles de páginas,
  renombrar y eliminar, estado de guardado, modo completo/sencillo, límites de
  navegación, Escape y recuperación del dibujo tras cerrar el lector.
- Catálogo público: búsqueda con reinicio de paginación, más resultados,
  traducción, texto inerte, visor sin scripts y respuesta tardía tras cerrar.
- Cerrar una publicación mientras carga el estado privado restaura el lienzo
  al terminar. Se devuelve el foco desde el iframe de eXe al diálogo antes de
  esperar la API, permitiendo Escape y navegación por teclado. Prueba aprobada.
- Comprobación visual en navegador nuevo con datos sintéticos: creación, taller,
  lector y vuelta a estantería en valenciano. Capturas
  `vue-complete-create-va.png`, `vue-complete-workshop-va.png` y
  `vue-complete-reader-va.png` en artifacts, sin versionar.
- Un único punto de montaje Vue y bundle local de 131.937 bytes. No se añaden
  dependencias ni servicios. eXe, su adaptador, las API, el esquema IndexedDB,
  el origen del navegador y el formato `.elpx` conservan su implementación.
- Archivos servidos por nginx comprobados contra los locales. No se ha realizado
  otra comprobación desde un dispositivo remoto ni usado cuentas personales.

Arquitectura y reproducción: [VUE_PILOT.md](VUE_PILOT.md). La comprobación manual
con libros y cuentas reales corresponde al siguiente paso de aceptación.

## Simplificación de acciones e idioma inicial — 23-10-2026

- Botones de muestras con el mismo tamaño y estilo: leer, editar y descargar.
  Extensión técnica retirada del texto visible, conservando formato y archivos.
- 13 pruebas previas de muestras/idiomas aprobadas; revisión visual en ES, VA y
  tamaño de tablet. Despliegue de etiquetas verificado sin reiniciar otras apps.
- Primera visita: URL y preferencias guardadas tienen prioridad; en su ausencia,
  se consulta la lista de idiomas del navegador. Variantes regionales ES/CA/EN
  y `ca-ES-valencia` reconocidas; idioma sin traducción usa el siguiente de la
  lista o castellano. 13 pruebas de idiomas aprobadas, con seis listas del
  navegador y prioridad de URL, cookies y elección manual persistente.

Verificación pública adicional: 20 casos distintos de idiomas y muestras
aprobados (19 en la primera ejecución y el restante tras corregir la simulación
de cookie compartida del test). La prueba de cambio entre aplicaciones ahora
reemplaza la cookie real de dominio `.edutictac.es`, sin crear otra homónima
limitada al host. No se modifica el comportamiento de producción para este ajuste.

## Acerca de en un único idioma — 23-10-2026

La página informativa aplica la misma resolución de idioma que el taller,
extraída a `public/locale.js`: URL, preferencia compartida, preferencia local,
navegador y castellano como último recurso. Texto y título traducidos a ES,
VA, CA y EN; enlaces de licencias y fuente conservados. El enlace de vuelta
mantiene el idioma. Se actualiza también al volver a enfocar la página.

13 pruebas de idiomas del editor aprobadas tras compartir el módulo, incluida
creación y guardado. Comprobación en navegador de los cuatro idiomas, vuelta al
editor, idioma regional del navegador y prioridad del parámetro URL. Revisión
visual en valenciano sin párrafos duplicados ni textos bilingües.
