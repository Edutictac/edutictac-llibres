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

El prototipo sigue pudiendo utilizarse por separado. La arquitectura y los límites
implementados están en [RESOURCE_PUBLICATION.md](RESOURCE_PUBLICATION.md).

## Siguientes mejoras

- Evaluar la experiencia con libros reales y acceso docente OIDC.
- Narraciones y audio (fuera de esta primera publicación).
- Moderación y política editorial del banco antes de abrir publicaciones en Internet.

## Publicación del alumnado con aprobación docente

Petición expresa del usuario, 21-10-2026. Pendiente de implementar.

- [ ] Permitir al alumnado enviar un libro a revisión sin hacerlo público.
- [ ] Mostrar al tutor o docente responsable las solicitudes de su alumnado.
- [ ] Aprobar o devolver el libro para corregirlo antes de su publicación.
- [ ] Publicar únicamente la versión aprobada; nuevas modificaciones requieren
      una nueva aprobación.
- [ ] Mantener el aislamiento por aula y los borradores privados.
