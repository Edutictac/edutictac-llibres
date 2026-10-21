# Roadmap de EduTicTac Llibres

## Hito implementado: publicar historias en el banco de recursos

Petición expresa del usuario, 21-10-2026. **Implementado como conexión opcional; validado en local**.

- [x] Publicar voluntariamente un libro terminado en el banco común de EduTicTac.
- [x] Ofrecer HTML para leer desde el navegador, sin entrar al editor.
- [x] Permitir ofrecer `.elpx` como descarga editable opcional.
- [x] Mostrar las mismas publicaciones en «Històries compartides» dentro de Llibres.
- [x] Mantener una única publicación y sus archivos, con actualización y retirada
      coherentes desde ambas vistas.
- [x] Revisar portada, título, autoría o pseudónimo y licencia antes de publicar.
- [x] Comprobar alojamiento persistente, aislamiento del visor y permisos del publicador.

Llibres sigue pudiendo utilizarse por separado. La arquitectura y los límites
implementados están en [RESOURCE_PUBLICATION.md](RESOURCE_PUBLICATION.md).

## Siguientes mejoras

- [x] Completar la interfaz Vue: creación, taller, lector, Rebost, historias
  compartidas, publicación, revisión y estantería. Arquitectura y reproducción
  en [VUE_PILOT.md](VUE_PILOT.md).
- Evaluar la experiencia con libros reales y acceso docente OIDC.
- Narraciones y audio (fuera de esta primera publicación).
- Moderación y política editorial del banco antes de abrir publicaciones en Internet.

## Publicación del alumnado con aprobación docente

Petición expresa del usuario, 21-10-2026. Implementado como conexión opcional.

- [x] Permitir al alumnado enviar un libro a revisión sin hacerlo público.
- [x] Mostrar al tutor o docente responsable las solicitudes de su alumnado.
- [x] Aprobar o devolver el libro para corregirlo antes de su publicación.
- [x] Publicar únicamente la versión aprobada; nuevas modificaciones requieren
      una nueva aprobación.
- [x] Mantener el aislamiento por aula de los envíos y conservar los borradores en el navegador.

Pendiente de una integración posterior: vincular alumnos de Authentik con aulas
de Commons. Esta primera revisión utiliza las credenciales de código y PIN que
ya tienen un aula y responsables verificados.
