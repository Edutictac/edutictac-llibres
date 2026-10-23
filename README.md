# EduTicTac Llibres

Taller de libros ilustrados con eXeLearning e integración opcional con Commons.
Funciona sin Commons ni cuentas. Ofrece una conexión **opcional de lectura** a
Rebost y una conexión opcional de publicación al banco común. No usa servicios de IA ni modifica los archivos de eXeLearning.

Instalación pública: **https://llibres.edutictac.es/**, sin necesidad de Tailscale.
Crear y guardar libros en el navegador no requiere cuenta. Para compartirlos en
el Banc se utiliza la cuenta docente de EduTicTac; el alumnado entra con código
y PIN de aula y envía sus libros para la aprobación de su docente.
Despliegue y comprobaciones en [docs/PRODUCTION.md](docs/PRODUCTION.md).

## Conte de mostra

«La papallona i els colors del bosc» és un llibre en valencià amb cinc pàgines
de conte i una de crèdits. La portada de Llibres permet llegir-lo, descarregar
el `.elpx` o editar una còpia que es guarda com un llibre nou al navegador.
Inclou imatges del catàleg públic Scratch del Rebost, text i una flor dibuixada.
No necessita compte ni es publica automàticament en el Banc.

La lectura de les mostres utilitza el mateix lector per pàgines que el botó
«Llig» del taller, sense iniciar l'editor ni guardar una còpia. Els enllaços
antics dels exemples continuen obrint eixe lector.

Els recursos, les fonts originals i les llicències s'incorporen a l'editable.
El conte i les adaptacions es distribuïxen amb CC BY-SA 2.0; el codi de Llibres
manté la seua llicència AGPL. La procedència de les cinc imatges està també en
`public/examples/la-papallona/provenance.json`.

Per a regenerar-lo amb l'adaptador real eXe i imatges públiques del Rebost:

```sh
python scripts/build-demo.py --origin https://llibres.edutictac.es
```

Utilitza un navegador efímer, sense compte, i bloqueja les escriptures de xarxa.
No crea dades en el servidor. Les proves de `tests/test_demo.py` comproven els
crèdits incorporats i que l'edició d'una còpia conserva els llibres existents.

## Mode còmic

Crear llibre → Còmic → triar 2, 3 o 4 vinyetes. El llibre té portada i una
pàgina amb vinyetes. Les pàgines següents poden usar una distribució diferent.
Els marcs queden protegits contra moviments accidentals.

En una pàgina de còmic, triar la vinyeta abans d'afegir una imatge o una
bafarada. Diàleg, pensament i narració es mouen com un sol objecte amb el text.
Seleccionar la bafarada i prémer «Edita la bafarada» permet canviar-la. El
guardat, `.elpx`, lector i publicació reutilitzen els mecanismes del llibre.

La mostra «La granota i la idea brillant» està en valencià, amb personatges i
un fons del Rebost, tres pàgines de còmic (2/3/4 vinyetes), portada i crèdits.
Es pot llegir, descarregar o editar una còpia des de la portada local.

```sh
python scripts/build-demo.py --comic --origin http://127.0.0.1:8098 \
  --rebost-origin https://llibres.edutictac.es
```

Esta primera versió ajusta les imatges a la vinyeta triada quan s'inserixen;
després es poden moure lliurement. No incorpora retall automàtic, redistribució
del contingut ni cues de bafarada editables amb punts. Les proves es fan primer en local i amb un candidat aïllat. L'estudi inicial està en
[docs/COMIC_FEASIBILITY.md](docs/COMIC_FEASIBILITY.md).

## Iniciar

```sh
python3 scripts/bootstrap.py
docker compose up -d
```

Abrir `http://localhost:8098/`. En el laboratorio con Tailscale:
`http://100.74.151.108:8098/`. Puerto configurable mediante `LLIBRES_PORT` y
dirección de escucha mediante `LLIBRES_BIND`. No usa los contenedores de Commons.

Crear libro → plantilla → texto/imágenes/dibujo → Guardar → Leer.
Las imágenes se eligen mediante el botón «Imagen» del taller o el botón de galería
de Slides; ambos utilizan el mismo selector. Se incorporan al libro. Para terminar
un trazo, pulsar «Seleccionar» antes de editar texto.

Los libros se guardan **al pulsar Guardar, Descargar, Leer o volver a Mis libros**
en IndexedDB del navegador. En modo independiente el servidor solo entrega archivos estáticos; no recibe
libros. Con la publicación opcional se envía únicamente el libro confirmado al banco. Borrar datos del navegador, cambiar de perfil, dirección o dispositivo
crea otra estantería. Descargar `.elpx` para conservar una copia transportable.
No hay sincronización ni guardado automático durante la escritura.

## Alcance

- Estantería local, título y cuatro plantillas de inicio, incluido el cómic.
- Páginas con texto, imágenes del dispositivo y dibujo libre sencillo.
- Añadir, renombrar, subir/bajar y eliminar páginas; al menos una página por libro.
- Guardar/reabrir, descargar fuente `.elpx`, lectura de páginas, HTML y EPUB.
- Interfaz propia en castellano, catalán, valenciano e inglés. Algunas herramientas del lienzo
  upstream mantienen etiquetas inglesas.
- El importador de Llibres acepta solo proyectos de páginas `slide`, con
  límites y comprobaciones de estructura. No pretende abrir cualquier curso eXe.
- Interfaz orientada a ordenador. iPad, narraciones, IA, colaboración,
  cuentas propias quedan fuera. Publicación disponible mediante conexión opcional.

## Conexión opcional al Rebost local

La ejecución anterior sigue siendo independiente. Para usar el Rebost del Commons
local existente, que publica su portal en 8082 y utiliza la red Docker
`edutictac-commons_default`:

```sh
docker compose -f compose.yml -f compose.rebost.yml up -d
```

Mantiene el puerto 8098 y la misma estantería del navegador. Imagen → personajes e
ilustraciones o fondos → elegir. Reutiliza la interfaz **central** `/assets/` y su
protocolo `rebost-selection`, incluidos sus catálogos; no copia ni mantiene otra
galería. El botón de galería de Slides delega en este selector mediante el adaptador
externo, fijado a eXe 4.0.5.

Los catálogos EduTicTac y Scratch se consultan y utilizan **sin iniciar sesión**.
Solo «Mis imágenes» y las operaciones sobre la biblioteca personal requieren la
sesión individual que ya gestiona Commons. Para esa biblioteca, entrar en Commons
usando el **mismo nombre de host o IP** que en Llibres; los puertos pueden diferir.
El selector abre el acceso de Commons en otra pestaña. Tras entrar, pulsar
«Actualizar tras entrar». No se crean cuentas, claves técnicas ni un segundo
sistema de autenticación en Llibres. Esta configuración local usa HTTP dentro de la
Tailnet, igual que Commons; no es una configuración de publicación en Internet.

nginx conecta al portal existente por su red Docker, conserva sus permisos y
reenvía la cookie individual del navegador. Solo admite GET/HEAD a los recursos;
subir, borrar o modificar el Rebost desde esta conexión devuelve 403. Los accesos
se redirigen al Commons real en 8082; no se intermedian contraseñas ni callbacks de
autenticación. No hay URLs de servidores proporcionadas por proyectos o mensajes.
Los prefijos están limitados al selector, su script de idioma y `/api/assets/v1/`.
Se adapta únicamente la ruta del script de idioma en la respuesta del proxy para
que no colisione con el módulo de traducciones de Llibres.

Cada imagen se copia y normaliza a PNG dentro del libro: no queda enlazada a una
URL privada. Se comprueba formato real, tamaño, dimensiones y revisión antes de
insertar. Para imágenes de catálogo o copias con procedencia, se añade crédito
visible en la diapositiva final de créditos y un adjunto `*.rebost.txt` con JSON de procedencia, licencia
completa y fuente SVG **como texto inerte**, nunca ejecutado ni usado como imagen.
El adjunto (hasta 420 KiB) se conserva al guardar, reimportar y exportar HTML o EPUB. El
motor deduplica adjuntos e imágenes por contenido. Conservar los créditos al editar
y compartir. Si falta la licencia o cambia la revisión durante la lectura, se
cancela la inserción sin reemplazar el contenido de la página.

Los créditos de todo el libro se reúnen en una **única diapositiva final**,
«Créditos» o «Crèdits», ordenados por nombre y sin repetir una imagen usada varias
veces, aunque aparezca en distintas páginas. Las páginas de la historia no llevan
créditos superpuestos. La diapositiva se genera al usar imágenes del Rebost y se
actualiza al guardar o cambiar de página. Permanece al final al añadir o reordenar
páginas; se elimina si no queda ninguna imagen que necesite atribución.

La página automática se puede consultar desde el listado y el lector; se conserva
en `.elpx`, HTML y EPUB. Sus herramientas de edición están desactivadas. Los textos
ajustan líneas y escala para caber en una sola diapositiva. El vínculo con las
imágenes se conserva mediante `slideMeta` y las propiedades personalizadas de
Fabric, sin modificar la distribución de eXe. Se trasladan los pies y créditos
individuales de los libros anteriores, conservando las atribuciones que no se
puedan asociar con seguridad a una imagen antigua. La importación permite las 50
páginas de contenido y una diapositiva adicional de créditos.

Para volver al modo independiente, usar `docker compose up -d`. No elimina los
libros. El adaptador se puede retirar sin modificar el motor ni los libros ya
descargados. En otra instalación se deben configurar explícitamente la red,
upstream y enlaces de acceso; esta conexión no descubre servidores externos.

## Arquitectura y límites

Toda la interfaz interactiva propia utiliza Vue: portada y estantería, creación,
controles de páginas y herramientas, lector, selector de Rebost, historias
compartidas, publicación y revisión docente. `src/App.vue` monta una sola
aplicación; `src/workshop.js` coordina el motor y conserva los binarios fuera del
estado reactivo. Un único bundle compilado se sirve localmente.
No requiere Node en Docker ni cambia el almacenamiento de libros. Código,
compilación y licencias en [docs/VUE_PILOT.md](docs/VUE_PILOT.md).

eXeLearning **4.0.5 estático**, release oficial con SHA-256 en `upstream.json`,
servido sin cambios desde `vendor/` (no versionado). UI propia en `src/`, compilada a `public/ui.js`,
cliente IndexedDB y un adaptador acotado `adapter.js`. Un nginx independiente
sirve todo bajo el mismo origen. Sin backend de aplicación ni base de datos.

El adaptador utiliza el protocolo incrustado para abrir y exportar y APIs internas
para páginas/iDevices. El dibujo usa el lienzo Fabric que upstream expone como
`__slideEditorCanvas`. Estos puntos **no son una API de plugins estable**: la versión
está fijada y el recorrido completo debe probarse antes de actualizarla.

La prueba detectó que `REQUEST_SAVE` del bridge 4.0.5 no encuentra exportador en
esta distribución; se utiliza `REQUEST_EXPORT` con formato `elpx`. La sincronización
de iDevices espera `save()` individual y actualiza el modo del motor antes de editar
de nuevo. Se espera a que los objetos de la escena, incluidas sus imágenes, hayan
terminado de cargar antes de permitir guardarla. Se retira la etiqueta de script
de edición `slide.js` antes de reabrirla:
el cargador upstream evita recargarla aunque haya vaciado su global de edición.
Se destruye la instancia de lienzo anterior al terminar su guardado. En HTTP se
proporciona el UUID Web Crypto que el bridge de apertura exige.
Son adaptaciones externas; no se parchea ningún archivo eXe.

La importación comprueba ZIP, rutas, tamaños declarados y descomprimidos, XML,
tipos de escena y decodificación de imágenes. Reconstruye un paquete de entrada
con XML, imágenes y adjuntos de créditos validados: descarta temas ejecutables, librerías y HTML prerenderizado del
archivo recibido. Solo se reutiliza el runtime instalado y el tema base local.
La política de red del taller limita las conexiones del editor al propio origen.
Esto no equivale a una auditoría de seguridad completa del motor upstream.

La lectura local utiliza una vista SVG saneada. El texto sigue editable en la
fuente, pero la accesibilidad semántica de un libro completo requiere más trabajo.
EPUB se ofrece como salida experimental; su resultado depende del lector y no
se promete un álbum de maquetación fija ni narración sincronizada.

## Comprobaciones

```sh
python3 -m pip install -r tests/requirements.txt
python3 -m playwright install chromium
python3 -m pytest -q tests
```

La prueba usa `/usr/bin/chromium` si existe, o Chromium instalado por Playwright.
`LLIBRES_TEST_URL` permite probar otra dirección, incluida la IP de Tailnet.
Contextos de navegador sintéticos; nunca cuentas o bibliotecas reales de Commons.
Para las pruebas de integración con el banco real, disponer del checkout hermano
`../recursos-api` e instalar `tests/requirements-publication.txt`. Sin esas
dependencias, esas pruebas opcionales se omiten.

## Licencias y código fuente

Código propio de Llibres: AGPL-3.0-or-later. Texto completo en `LICENSE`.
eXeLearning: AGPL-3.0-or-later. Su iDevice `slide` declara CC BY-SA 4.0;
no se ha copiado su implementación al código propio, se utiliza la distribución
original. Fabric.js es MIT, DOMPurify tiene licencia MPL-2.0 o Apache-2.0 y
fflate MIT. Se conservan sus avisos en la distribución oficial.

Fuentes exactas del motor:
https://github.com/exelearning/exelearning/tree/63748a3d87c8c3a757ef5f3479945db871ddb4c2

El código de Llibres y las instrucciones de reproducción se descargan desde
«Sobre Llibres y licencias». No incluye libros, datos del navegador ni secretos.

La conexión opcional al banco permite **Publicar**, actualizar y retirar libros,
y leerlos en **Històries compartides**, sin duplicar el catálogo del banco.
Requiere Commons y el perfil de recursos; la lectura es pública y la publicación
requiere una sesión individual docente. Editable `.elpx` opcional.

```sh
docker compose -f compose.yml -f compose.rebost.yml -f compose.publication.yml up -d
```

Arquitectura, permisos, persistencia y límites en
[docs/RESOURCE_PUBLICATION.md](docs/RESOURCE_PUBLICATION.md).
Estado y mejoras pendientes en el [roadmap](docs/ROADMAP.md).


## Enviar libros del alumnado a revisión

Con la conexión opcional de publicación activada, el alumnado entra con su código
y PIN del aula y elige **Enviar a mi docente**. El envío permanece privado.
El docente abre **Revisar libros · Docentes** para leer, devolver con comentario
o aprobar la publicación. Cambios posteriores requieren otra aprobación.
El alumnado utiliza el código y PIN del aula de Commons; no necesita Authentik.
Detalles de permisos y conservación en [RESOURCE_PUBLICATION.md](docs/RESOURCE_PUBLICATION.md).

## Idioma compartido con Commons

El selector ES/CA/VA/EN utiliza la preferencia funcional `edutictac_language`,
compartida con Commons, Rebost, Play y el Banc bajo `edutictac.es`. No requiere
iniciar sesión. `?lang=en` permite elegir explícitamente el idioma de llegada.
Fuera de ese dominio se guarda en el host actual y se conserva la preferencia
local anterior. La copia `public/language-preference.js` debe permanecer idéntica
al helper de Commons; funciona sin conexión con ese servidor.

Catalán y valenciano comparten una base con ajustes de vocabulario. El inglés
incluye todos los mensajes del taller. Las nuevas plantillas, metadatos de idioma,
fechas y créditos usan la elección actual; los libros existentes conservan su
contenido. Durante la edición no se cambia de idioma automáticamente al volver
de otra aplicación: la preferencia se aplica al regresar a la estantería, para
mantener el editor y el libro abiertos en su idioma.

Pruebas: `python -m pytest tests/test_language.py tests/test_vue_application.py
 tests/test_workshop.py -q` con las dependencias de `tests/requirements.txt` y la
instancia local en 8098 (configurable con `LLIBRES_TEST_URL`).

## Preparación en el VPS

El candidato de producción tiene un perfil separado, de solo lectura y accesible
únicamente por loopback. El editor y el selector Rebost están disponibles; la
publicación permanece desactivada hasta integrar la API del banco. Procedimiento,
comprobaciones y reversión en [PRODUCTION.md](docs/PRODUCTION.md).
