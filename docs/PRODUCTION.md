# Preparación de Llibres en el VPS

Esta fase instala un candidato privado. No abre el dominio ni activa publicación.
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

La ID API desplegada ya contiene el adaptador Llibres, pero aún no tiene
configurada su URL del Banc ni el token de aplicación. El Banc público utiliza
una API anterior. Deben prepararse copia consistente, ensayo sobre una copia,
actualización de API y conexión autenticada entre servidores antes de activar
la publicación. Mantener acceso docente con cuenta EduTicTac y alumnado con
código/PIN de su aula; aprobar únicamente mediante su docente responsable.

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
