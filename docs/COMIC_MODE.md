# Mode còmic: primera versió

Implementació basada en l'estudi [COMIC_FEASIBILITY.md](COMIC_FEASIBILITY.md).
Mateix motor eXe 4.0.5, pàgines Slides, Fabric 7.4.0 i contenidor `.elpx`.
No es modifica el motor ni s'incorporen dependències, serveis o API noves.

## Ús

Crear llibre → Còmic → 2, 3 o 4 vinyetes. Es crea una portada i una pàgina de
còmic. Per a afegir una pàgina, triar abans la seua distribució en el lateral.
La distribució d'una pàgina existent es conserva: no es reemplaça el contingut.

Seleccionar la vinyeta en el taller i inserir imatges pel selector de sempre.
Les imatges s'ajusten sense deformació a eixa vinyeta en inserir-les. Després es
poden moure i redimensionar amb les ferramentes habituals.

«Afig una bafarada» oferix diàleg, pensament i narració. La forma i el text són
un grup i es mouen junts. Per a canviar el text, seleccionar la bafarada i prémer
«Edita la bafarada». El text massa llarg es rebutja sense alterar la bafarada
anterior; el diàleg conserva l'esborrany perquè es puga escurçar.

## Arquitectura i compatibilitat

- `public/comic.js`: geometria de les vinyetes i grups Fabric estàndard. No
  registra classes noves que obliguen a carregar un plugin per a llegir el llibre.
- `public/adapter.js`: creació, selecció, posició d'imatges, bafarades i recuperació
  de les proteccions en reobrir. La forma i el text s'actualitzen dins del grup
  existent, amb una modificació per a la història nativa de desfer/refés.
- `src/BubbleDialog.vue`: edició de text explícita, límit de 300 caràcters i
  comprovació que el llibre i la pàgina continuen sent els mateixos.
- `slideMeta.comicDocument`: versió 1 i distribució per defecte del llibre.
- `slideMeta.comicPanel`: versió 1, distribució i índex de cada marc protegit.
- `slideMeta.comicPanelLabel`: numeració protegida.
- `slideMeta.comicBubble`: versió 1, identificador, tipus i text. La duplicació
  nativa rep un identificador nou si cal; no confon l'edició amb l'original.

Els marcs es tornen no seleccionables en carregar el llenç; la protecció no
depén que Fabric serialitze propietats visuals de control. Els grups conserven
el text com a `Textbox`, sense HTML executable. L'importador accepta només el
descriptor estàndard `layoutManager` amb estratègia `fit-content`, dins d'un grup
i sense propietats addicionals. La resta de límits ZIP/SVG i classes permeses es
conserven. L'escena continua en la versió 3.

La procedència de les imatges i els crèdits finals reutilitzen `rebost.js` i
`credits.js`. Publicació i aprovació docent reutilitzen els permisos existents.
Les comprovacions d'escriptura utilitzen bases i identitats temporals.

## Exemple

«La granota i la idea brillant», en valencià, està en
`public/examples/la-granota/`: portada, pàgines de 2/3/4 vinyetes i crèdits.
Les quatre imatges del Rebost incorporen PNG, font original, autoria i llicència.
Les mostres s'obrin en el mateix lector Vue del taller, amb anterior/següent i
SVG sanejat; llegir-les no inicia eXe ni crea llibres en IndexedDB. La còpia
editable té un identificador nou. El conte i el còmic anteriors no es substituïxen.

```sh
python scripts/build-demo.py --comic --origin http://127.0.0.1:8098 \
  --rebost-origin https://llibres.edutictac.es
```

La connexió opcional a Rebost del generador només fa GET/HEAD públics, elimina
les capçaleres de sessió i no seguix redireccions. No envia llibres ni credencials.
La llicència del còmic i les adaptacions és CC BY-SA 2.0; el programari manté AGPL.

## Límits deliberats

No hi ha retall automàtic, contingut vinculat al moviment del marc, redistribució
de pàgines plenes, vinyetes irregulars ni edició de la cua amb punts de control.
No es força el text a deformar-se: s'ajusta la font fins a un mínim llegible i,
si no cap, es demana un text més curt. Els diàlegs existents sempre es conserven
quan una operació falla. El suport tàctil avançat continua fora d'esta fase.
