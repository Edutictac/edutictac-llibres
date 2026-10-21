# Publicación en el banco de recursos

Implementación local del 21-10-2026. La conexión es opcional: el taller sigue
funcionando sin Commons y los borradores continúan en IndexedDB del navegador.

## Uso

1. Abrir un libro y pulsar **Publicar**.
2. Iniciar sesión docente en Commons si es necesario. El acceso termina en una
   confirmación de Llibres; al cerrar esa pestaña y volver al libro, el formulario
   se actualiza automáticamente. Se conserva el botón de actualización manual.
3. Revisar portada, título, autoría o pseudónimo, descripción y licencia.
4. Elegir si se ofrece también el editable `.elpx` y confirmar la publicación pública.
5. Compartir el enlace. El libro aparece en el banco común y en **Històries compartides**.

Volver a Publicar permite actualizar la misma dirección o retirar la publicación.
Retirar elimina la lectura y sus archivos públicos y desactiva la ficha en ambos
catálogos. No elimina el borrador del navegador. Una retirada no puede revocar
copias que alguien haya descargado anteriormente. No se publica automáticamente.

## Arquitectura implementada

- `recursos-api/app/books.py`: valida paquetes y genera un lector HTML sin JavaScript.
  Guarda páginas, imágenes y editable opcional en la SQLite existente, junto a la
  ficha `Resource` del proveedor `edutictac-llibres`. Archivos e índice se actualizan
  en una misma transacción; no hay otro servicio ni base de datos.
- `edutictac-commons/services/id-api/books.py`: frontera de identidad y permisos.
  Solo una sesión individual vigente de docente o administrador puede publicar;
  utiliza la identidad revocable de Rebost. Los tokens de compatibilidad docentes
  no sirven para atribuir una publicación individual. El token técnico permanece
  entre servidores y nunca se entrega a Llibres ni al navegador.
- `recursos/scripts/`: el catálogo consulta las publicaciones actuales, las presenta
  como libros y reutiliza el visor iframe. Las retiradas no quedan en la caché API
  del service worker.
- `public/publication.js` y el adaptador Llibres generan el paquete a partir de las
  páginas reales del editor. Las imágenes se incorporan al libro: no dependen de
  enlaces privados de Rebost. Se conservan la diapositiva final de créditos y los
  adjuntos de procedencia utilizados. La descarga editable incluye todo el proyecto
  únicamente cuando el publicador activa expresamente esa opción.

Un solo identificador estable por propietario y borrador, una sola copia publicada
y dos vistas del catálogo. Revisiones `If-Match` evitan sobreescribir cambios de
otra pestaña. Repetir una publicación idéntica es idempotente.

## Activación local

Requiere el portal Commons y el perfil `recursos` existentes, con los adaptadores
anteriores desplegados. La variable del banco `LLIBRES_PUBLIC_BASE_URL` fija el
origen público, sin rutas: en el laboratorio `http://100.74.151.108:8086`.

```sh
docker compose -f compose.yml -f compose.rebost.yml -f compose.publication.yml up -d
```

Llibres conserva `http://100.74.151.108:8098/` y su estantería. La red existente
`edutictac-commons_default` permite llegar al portal; nginx solo expone las rutas
fijas del adaptador. Para volver al taller independiente: `docker compose up -d`.
La publicación usa la sesión Commons del mismo host/IP; no se intermedian
contraseñas ni callbacks de acceso. Lectura y catálogo no requieren sesión.
Esta configuración HTTP es para la Tailnet; el despliegue público debe conservar
HTTPS y la configuración de cookies del entorno de destino.

## Validación, almacenamiento y límites

No se acepta HTML, JavaScript ni una URL de alojamiento elegidos por el proyecto.
El servidor genera el HTML a partir de SVG con lista cerrada de elementos,
atributos y estilos; rechaza DTD, entidades, scripts, eventos y referencias externas.
Decodifica y normaliza las imágenes PNG con Pillow. El visor impone CSP sandbox,
sin scripts ni formularios, y los adjuntos solo se descargan. El `.elpx` opcional
se inspecciona como ZIP/XML y se sirve como adjunto; nunca se ejecuta ni interpreta
como una página pública.

ZIP sin extracción a disco: rechaza rutas peligrosas, enlaces simbólicos, cifrado,
archivos duplicados o inesperados. Límites: 30 MiB comprimidos, 100 MiB expandidos,
2048 entradas, 50 páginas de historia más una de créditos; PNG de hasta 5 MiB y
4096 píxeles por lado. Salida publicada máxima 60 MiB, editable 25 MiB, 50 libros
y 200 MiB activos por publicador. Cuota global por defecto 2 GiB, configurable con
`LLIBRES_PUBLIC_MAX_BYTES`. Dos compilaciones simultáneas como máximo.

Persistencia: `edutictac-commons/data/recursos-api/recursos.db` y su volumen ya
existente, con usuario de contenedor 1000. Copiar la SQLite mediante su API de
backup (no copiar solo el archivo abierto si existe WAL). Una retirada borra los
BLOB públicos; las copias de seguridad siguen su política de retención. SQLite
puede conservar espacio asignado hasta un mantenimiento posterior con VACUUM.
No se guardan libros ni credenciales en imágenes Docker o repositorios.

## Licencias y alcance

Se reutilizan eXeLearning, Fabric, DOMPurify y fflate sin modificar el núcleo eXe.
El servidor utiliza `defusedxml` 0.7.1 (PSF) y Pillow 13.0.0 (HPND), ambas libres;
Pillow ya se emplea en Commons y aquí se declara en el servicio del banco.
El lector ofrece el código exacto del servidor como ZIP público en
`/api/llibres/source.zip`; contiene solo fuentes y las instrucciones de construcción,
nunca datos, entorno ni credenciales. El taller mantiene su propia descarga de fuentes.
La licencia de las imágenes y su atribución se conserva independientemente de la
licencia elegida para el libro. No hay API de IA, narración, EPUB publicado ni visor
genérico de cursos `.elpx`: esta primera conexión publica los libros ilustrados
del taller. El HTML/EPUB descargable existente sigue disponible por separado.

Las pruebas usan identidades sintéticas y bases temporales: nunca publican libros
personales en el banco real. La comprobación manual del acceso OIDC docente y de
un libro propio queda para el usuario.

## Corrección del acceso docente (21-10-2026)

El enlace de publicación tenía como destino final `/assets/`, heredado del selector
de imágenes. Ahora utiliza `/llibres-login.html?lang=es|va` en el portal Commons.
El proxy conserva el parámetro `next`; los accesos desde Rebost siguen regresando
a `/assets/`. Si ya existe sesión Authentik, la autorización puede completarse sin
volver a pedir contraseña. La página de confirmación comprueba permisos sin mostrar
identidades ni credenciales.

Se corrigió también el valor por defecto del wrapper local de `roles` a `groups`,
coherente con el proveedor Authentik y `.env.example`. Se respetan los valores
configurados explícitamente. Las sesiones anteriores conservan su rol firmado:
entrar de nuevo desde el botón obtiene una sesión con los permisos correctos.
