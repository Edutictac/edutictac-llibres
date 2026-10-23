# Llibres en el VPS

**Estado actual, 22-10-2026:** disponible públicamente en
https://llibres.edutictac.es/ con certificado propio y controles de publicación
activados. El circuito con cuentas reales queda pendiente de aceptación humana;
las pruebas automatizadas de publicación y revisión usan identidades y bases
temporales, sin crear libros ni cuentas de prueba en producción.

El perfil Docker de preparación escucha en loopback. La apertura pública se
realiza con el vhost HTTPS independiente descrito al final de este documento.
El editor funciona sin cuentas; Rebost se consulta mediante el portal Commons
existente y conserva sus permisos. No se duplican catálogos ni servicios de identidad.

## Artefacto reproducible

```sh
npm ci
npm run build
python3 scripts/bootstrap.py
docker build -t edutictac/llibres:production-candidate .
```

`bootstrap.py` verifica SHA-256 de la distribución oficial eXe 4.0.5 y regenera
el archivo de fuentes ofrecido a los usuarios, incluyendo la configuración Docker.
La imagen incorpora únicamente `public`, el motor estático verificado, la
configuración nginx y los avisos de licencia. El núcleo eXe no se modifica.

En el VPS se usa `/opt/edutictac-llibres/compose.yml`, copia del perfil
`compose.production.yml`, y `LLIBRES_IMAGE` se fija al digest verificado de la
imagen transferida. `docker compose up -d --no-build --pull never` arranca solo
Llibres. El nginx del contenedor escucha exclusivamente en `127.0.0.1:8182`;
no necesita volumen de datos, socket Docker ni privilegios. Raíz de solo lectura,
128 MiB y 0,5 CPU. El portal Commons existente escucha en `127.0.0.1:8180`.

No es una configuración genérica para cualquier centro: los orígenes de acceso
apuntan al Commons público de EduTicTac. Para el laboratorio siguen vigentes los
perfiles existentes, sin cambios en su puerto 8098 ni en la estantería local.

## Comprobaciones antes de abrir el dominio

- Salud del contenedor; puerto accesible solo por loopback.
- Crear, editar, dibujar, guardar, descargar y reabrir usando el motor real.
- Interfaz ES/CA/VA/EN; fuente y licencia descargables.
- Selector Rebost público, miniaturas, atribuciones y recursos incorporados al libro.
- Operaciones de escritura al Rebost bloqueadas en el proxy del editor.
- `publication-status` devuelve `enabled: false`; el botón de publicar se oculta.
- Sin reinicios ni modificaciones de los servicios o datos existentes.

Para probar desde otro equipo sin publicar HTTP en Internet, abrir un túnel:

```sh
ssh -N -L 18198:127.0.0.1:8182 samgua@100.69.168.122
```

Abrir `http://127.0.0.1:18198/`. Los libros creados ahí pertenecen a esa dirección
del navegador: no aparecen automáticamente en la futura estantería HTTPS.
Descargar `.elpx` permite trasladarlos.

## Integración posterior

La conexión de API y las copias consistentes ya están preparadas, según el
apartado de conexión al final. El frontend público del Banc ya está actualizado
a Vue y consulta los libros, con lector y filtro propios (22-10-2026). Antes de
activar la publicación hay que preparar HTTPS del editor. Mantener acceso docente con
cuenta EduTicTac y alumnado con código/PIN de su aula; aprobar únicamente mediante
su docente responsable.

Después se prepara vhost de `llibres.edutictac.es`, certificado TLS independiente
(sin sustituir certificados compartidos), comprobaciones de origen/cookies y
prueba real de acceso, envío, aprobación y lectura. No habilitar publicación
basándose solamente en que el editor está disponible.

## Reversión de esta preparación

`docker compose -f /opt/edutictac-llibres/compose.yml down` retira solo el candidato.
No restaurar bases de datos: esta fase no las modifica. Conservar el digest y
las fuentes para reproducir el artefacto. No borrar datos del navegador.

## Resultado de preparación — 22-10-2026

Candidato instalado y saludable en el VPS, con imagen
`sha256:21481f4b0f4d48557c1288e443afdce0e2dbec39034369ff488406591a35ca0a`.
Estado de preparación y línea base privados en
`/opt/edutictac-llibres/preparation/`. Solo escucha en loopback; no existe vhost
público de Llibres. DNS A/AAAA ya apunta al VPS, sin modificarlo.

Sobre el candidato real se verifican 36 pruebas: 14 comprobaciones HTTP de
recursos, bloqueo de escritura y administración, más 22 pruebas de idioma,
creación, edición, dibujo, plantillas, guardado, descarga y reapertura de libros.
La comparación de contenedores/arranques de ID, portal y EduHoot y PID/arranque de
Banc y Play confirma que no se han reiniciado. Publicación desactivada.

Una prueba adicional de navegador incorpora una imagen real del catálogo Rebost,
crea la diapositiva de créditos y guarda el libro en el navegador. Las solicitudes
de escritura de red están bloqueadas durante la prueba y no se produce ninguna.
No se usan cuentas personales ni se publican libros de prueba en el Banc.

## Conexión de API — 22-10-2026

El candidato ahora utiliza la imagen
`sha256:cf0563a8e48c31243daa091765abd96dded5d4b3c4f906720565e8e6a34bee53`.
Las rutas `/api/llibres/` conectan con Commons, que autentica al usuario y reenvía
al Banc con su credencial interna. El proxy elimina cabeceras de identidad
proporcionadas por el cliente. El visitante anónimo no puede publicar, enviar ni
revisar. El botón de publicación sigue oculto (`enabled: false`) hasta HTTPS.

La API pública del Banc ya está actualizada y las copias automáticas de Commons
incluyen su base y configuración, con recuperación de ambas bases desde el NAS.
La ID API conserva imagen y cuentas pero escucha ahora en loopback del host,
para alcanzar la API del Banc sin añadir otro proxy. Los detalles y la reversión
se documentan en `recursos-api/docs/PRODUCTION_LLIBRES.md`.

15 pruebas sobre este perfil real, incluyendo imagen real de Rebost y créditos,
correctas. Salud y redirección de acceso docente comprobadas sin entrar con una
cuenta real. La publicación, aislamiento por clase y aprobación se ensayaron
sobre copias privadas con actores sintéticos, sin crear publicaciones de prueba
en producción.

Antes de abrir: mantener la comprobación del frontend del Banc (ya actualizado
a Vue y con lector de libros), crear vhost/certificado
independiente de Llibres, habilitar publicación y comprobar con cuentas reales.
No se han modificado DNS, certificados ni los servicios de Play y EduHoot.

## Apertura HTTPS

Plantillas del nginx del host en `deploy/nginx/`: `llibres.http.conf` sirve
únicamente ACME para la primera emisión; `llibres.https.conf` sirve el editor
mediante `127.0.0.1:8182` y redirige HTTP a HTTPS. No copiar estas plantillas
dentro del contenedor: son el frontal público del host.

1. Registrar los hashes de todos los certificados actuales, estado de
   contenedores y Play en una línea base privada. Comprobar DNS A/AAAA.
2. Instalar el vhost HTTP y comprobar el desafío por IPv4 e IPv6 públicos.
3. Emitir con Certbot/webroot un certificado **nuevo y exclusivo** con nombre
   `llibres.edutictac.es`, único dominio `llibres.edutictac.es` y raíz
   `/var/www/commons-acme`. Reutilizar la cuenta ACME existente sin mostrar sus
   credenciales. No usar `--expand` ni reemplazar `edutictac.es`.
4. Regenerar `public/source/llibres-source.zip` con `scripts/source-archive.py`
   y copiarlo a `/var/www/llibres-source/llibres-source.zip` (directorio 755,
   archivo 644). Contiene también las plantillas del host; no contiene datos,
   credenciales, claves, libros ni el directorio vendor.
5. Instalar el vhost HTTPS con `publication-status` temporalmente en `false`.
   Ejecutar `nginx -t`, recargar y esperar disponibilidad HTTPS. Verificar TLS,
   archivos/motor/selector Rebost, permisos anónimos y origen de las redirecciones.
6. Publicar la plantilla final, que habilita `publication-status` **solo en
   HTTPS**; repetir pruebas y conservar la aprobación real con cuentas como
   comprobación humana pendiente. El perfil loopback mantiene `enabled: false`.
   El indicador muestra los controles de publicación; Commons sigue exigiendo
   una sesión válida y la pertenencia al aula para cualquier operación.

La API, sus secretos, los contenedores y sus volúmenes no cambian en esta fase.
El frontal preserva Host y fija `X-Forwarded-Proto: https`. El proxy del editor
conserva la eliminación de cabeceras de identidad proporcionadas por visitantes.
Acceso docente → Commons → proveedor existente; alumnado → Commons → código/PIN.
La cookie segura compartida entre subdominios sigue siendo la de Commons.

```sh
LLIBRES_PRODUCTION_TEST_URL=https://llibres.edutictac.es \
LLIBRES_PUBLICATION_EXPECT_ENABLED=1 \
  python -m pytest tests/test_production_profile.py -q
```

Las pruebas solo intentan escrituras anónimas rechazadas; el navegador bloquea
cualquier escritura de red y sus libros se guardan en un contexto efímero.
No confundir una redirección correcta con haber iniciado sesión personalmente.
Completar manualmente: docente entra y publica; alumnado entra con código/PIN,
envía; su tutor aprueba; el libro aparece y se lee sin cuenta en el Banc.

Para retirar la publicación, cambiar únicamente el indicador del vhost a
`false` y recargar nginx. Esto oculta controles; **no revoca permisos ni borra
libros publicados**. Para retirar la aplicación pública, deshabilitar solo este
vhost y recargar; conservar certificado, datos y perfil Docker. No restaurar
SQLite ni cambiar los certificados compartidos. Certbot puede renovar el nuevo
certificado con el mismo webroot. El temporizador `certbot.timer` existente
ejecuta la renovación. Instalar `deploy/certbot/llibres-nginx` como archivo
ejecutable root 755 en `/etc/letsencrypt/renewal-hooks/deploy/40-llibres-nginx`:
valida y recarga nginx únicamente cuando se renueva el certificado de Llibres.
No altera la renovación de los certificados compartidos.

Ensayo manual de renovación sin sustituir el certificado activo:

```sh
sudo certbot renew --dry-run --cert-name llibres.edutictac.es \
  --non-interactive --no-random-sleep-on-renew
```

La última opción evita la espera aleatoria prevista para ejecuciones automáticas;
no cambiar la programación habitual del temporizador para realizar este ensayo.

## Resultado de apertura — 22-10-2026

El vhost público coincide con `deploy/nginx/llibres.https.conf`. Certificado
independiente emitido con el webroot existente; acceso HTTPS IPv4/IPv6 devuelve
200 y verificación TLS correcta. Los 14 certificados anteriores conservan su
hash. Ensayo de renovación correcto y hook dedicado probado para Llibres y para
el caso de otro certificado (no hace nada). Temporizador Certbot activo.

Publicación habilitada en HTTPS; el perfil privado conserva `enabled: false`.
La consulta anónima no concede ningún permiso aunque se envíen cabeceras de
identidad falsas. El acceso docente y el de alumnado redirigen a Commons con
retorno a la página de acceso de Llibres. Se ha verificado que la cookie de ID
sigue siendo segura y compartida entre subdominios, sin cambiar su configuración.

28 comprobaciones distintas correctas: 17 del perfil HTTPS y del selector real
Rebost (incluido el aviso de acceso al intentar publicar anónimamente), 2 de
edición/dibujo/descarga y reapertura sobre HTTPS, 1 de publicación/actualización/
lectura/retirada con editor público y API temporal, 2 del circuito de revisión
con sesiones y bases locales temporales y 6 de permisos y aislamiento en Commons.
Las 17 del perfil se ejecutaron antes y después de activar los controles.
Se actualizó un fixture de revisión para consultar el identificador docente a
Commons, en lugar de depender de una constante interna retirada; ambos idiomas
del circuito pasan. No se modificó el código de producción de autenticación.

Imagen Docker sin cambios:
`sha256:cf0563a8e48c31243daa091765abd96dded5d4b3c4f906720565e8e6a34bee53`.
No se reinician contenedores, API, Commons, Play ni EduHoot. DNS, bases de datos
y credenciales no cambian. Solo se añade el vhost/certificado y se recarga nginx.

Línea base, resultados y diagnóstico privado de Certbot en
`/opt/edutictac-llibres/https-activation/`. Para desactivar los controles existe
la copia `https-publication-disabled.conf`; restaurar solo esa configuración y
recargar nginx, sin tocar los datos. La fuente correspondiente publicada en
`/source/llibres-source.zip` incluye las plantillas HTTPS y el hook de renovación.

## Conte de mostra — 23-10-2026

La portada pública incorpora «La papallona i els colors del bosc», un conte en
valencià amb cinc pàgines i crèdits finals. Es pot llegir sense compte en
`/examples/la-papallona/`, descarregar el `.elpx` o obrir una còpia editable que
rep un identificador nou a l'estanteria. No és una publicació del Banc.
Les cinc imatges provenen del catàleg públic Scratch del Rebost; imatges,
atribucions, fonts originals i llicències queden incorporades al llibre.

La imatge del servei s'actualitza a
`sha256:16814869eb6398ba660c1ddac38eaca47993d6e7ba6cf7b4c9e4c8fd41e1f3d0`.
S'ha comprovat en un candidat privat 18183 abans de substituir només Llibres;
les altres aplicacions i Play conserven identificadors i hores d'arrancada.
Es mantenen el vhost, HTTPS, els permisos i l'indicador públic de publicació.
No es creen comptes ni publicacions de prova en el servidor.

Còpia anterior de Compose, font pública i línia base en
`/opt/edutictac-llibres/demo-20261023/`. Per a tornar arrere, restaurar eixe
Compose i recrear només el servei `llibres`, conservant la font anterior i
sense tocar SQLite o les dades del navegador. El candidat temporal es retira.
