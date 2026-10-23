# Roadmap de EduTicTac Llibres

## Mode còmic

- [x] Plantilles fixes de 2, 3 i 4 vinyetes amb marcs protegits.
- [x] Bafarades de diàleg/pensament i caixes de narració; text i forma agrupats.
- [x] Edició, moviment, desfer/refés, guardat i reimportació `.elpx`.
- [x] Mateix selector Rebost, crèdits, lector i publicació.
- [x] Exemple editable en valencià: «La granota i la idea brillant».
- [ ] Retall automàtic, vinyetes irregulars i redistribució de contingut.

Implementació i límits en [COMIC_MODE.md](COMIC_MODE.md).

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

## Rendimiento al abrir un libro

Diagnóstico pendiente de abordar, 23-10-2026. Al abrir un libro guardado el
editor se inicializa varias veces; es anterior al modo cómic y está en el
guardado y la sincronización de créditos que se ejecutan al abrir y al cambiar
de página.

- [ ] Abrir con una sola carga de página y una sola inicialización del editor.
- [ ] No ejecutar `syncCredits()` al seleccionar, mover o renombrar páginas.
- [ ] Migrar créditos heredados una sola vez y persistirlo.

Detalle, causas, plan por fases y criterios de aceptación en
[OPEN_PERFORMANCE_DIAGNOSIS.md](OPEN_PERFORMANCE_DIAGNOSIS.md).

## Publicación del alumnado con aprobación docente

Petición expresa del usuario, 21-10-2026. Implementado como conexión opcional.

- [x] Permitir al alumnado enviar un libro a revisión sin hacerlo público.
- [x] Mostrar al tutor o docente responsable las solicitudes de su alumnado.
- [x] Aprobar o devolver el libro para corregirlo antes de su publicación.
- [x] Publicar únicamente la versión aprobada; nuevas modificaciones requieren
      una nueva aprobación.
- [x] Mantener el aislamiento por aula de los envíos y conservar los borradores en el navegador.

El alumnado utiliza el código y PIN de su aula de Commons. Authentik se utiliza
para el acceso docente; no se prevé migrar el acceso del alumnado a Authentik.
La revisión ya reutiliza el aula y sus responsables verificados.
