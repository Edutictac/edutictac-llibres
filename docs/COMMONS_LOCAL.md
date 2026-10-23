# Llibres com a mòdul local de Commons

`Dockerfile.local` crea la imatge `commons-llibres` amb el mateix frontend i
motor eXeLearning verificat que la distribució independent. No modifica el
Dockerfile del servei públic. Ús des de Commons: perfil `llibres`, port 8098
configurable amb `LLIBRES_PORT`; `COMMONS_PORTAL_PORT` indica el port del portal.

El port propi evita reescriure les rutes absolutes del motor eXe i manté el
mateix origen del llibre i del selector Rebost que Llibres proxia en lectura.
Les cookies existents es compartixen pel nom del servidor, independentment del
port. Cal entrar i obrir Llibres amb el mateix nom de servidor.

El selector central, l’accés d’alumnat i l’entrada docent reutilitzen el portal.
La disponibilitat de publicar es consulta a l’estat públic dels mòduls: només
s’activa si `recursos` està habilitat. Els permisos reals continuen en l’API.
Sense Banc, es pot crear, llegir, guardar i descarregar llibres igualment.

Arrel de només lectura, temporals de nginx en `/tmp`, sense nous volums de dades.
Els llibres es guarden en el navegador o es descarreguen; no hi ha sincronització.
Les imatges copiades del Rebost viatgen amb el llibre. Mateixes llicències i font
corresponent oferida a `/source/llibres-source.zip`.
