# Mode còmic en EduTicTac Llibres

Estudi del 23-10-2026 sobre el codi actual. No implementa ni activa un mode còmic.

## Conclusió

És viable afegir-lo com una modalitat del mateix taller, amb esforç moderat.
La base gràfica ja existix: pàgines Slides d'eXeLearning 4.0.5, Fabric 7.4.0,
imatges del Rebost, textos, formes, dibuix, guardat `.elpx`, lector i publicació.
No cal un altre motor, una altra aplicació, serveis ni un fork d'eXe.

La primera versió recomanada és un selector «Conte / Còmic» amb plantilles de
2, 3 i 4 vinyetes, personatges del Rebost, bafarades de diàleg/pensament i caixes
de narració. El treball principal és aconseguir una edició clara per a Primària.

## Troballes verificades

| Component actual | Què permet reutilitzar | Límit o treball pendent |
|---|---|---|
| `src/CreateDialog.vue` i `src/workshop.js` | Creació, plantilles, pàgines, idioma i estanteria | Incorporar la modalitat i els dissenys de pàgina |
| `public/adapter.js` | Accés encapsulat a Fabric, escenes, imatges, exportació | Afegir operacions de vinyeta/bafarada en este adaptador |
| Slides inclòs en eXe 4.0.5 | La paleta Shapes ja inclou `speech-bubble` i `thought-bubble`, a més de figures geomètriques | La forma i el text no són una unitat pedagògica preparada per al nostre flux |
| `public/import.js` | Admet rect, ellipse, path, textbox i group dins d'escenes Fabric versió 3 | Comprovar recàrrega i límits amb composicions de còmic |
| `public/credits.js` | Recorre objectes agrupats per a conservar atribucions | Provar agrupació/desagrupació, duplicació i eliminació de vinyetes |
| Rebost | Personatges, disfresses del catàleg i fons ja reutilitzables | Triar el contingut de cada vinyeta sense duplicar el selector |
| `recursos-api/app/books.py` | La llista de SVG segurs ja inclou grups i `clipPath` | Verificar els atributs exactes generats, el sanejament i la rasterització |

El bundle inspeccionat és
`vendor/exelearning/static/files/perm/idevices/base/slide/edition/slide-editor.bundle.js`.
Les versions es verifiquen en `upstream.json` i les escenes de `public/adapter.js`.
La paleta nativa també inclou ferramentes de retall i ordre de capes; això no
equival a tindre ja un editor de còmic complet.

Comprovació pràctica en navegador efímer contra el candidat: crear un llibre,
inserir «Speech bubble» i «Thought bubble» des de la paleta nativa Shapes,
guardar, descarregar i reimportar el `.elpx`. Les dues formes es restauren com
a objectes `path`, amb rols `speech-bubble` i `thought-bubble`. No s'han publicat
continguts ni creat comptes de prova en producció. Açò confirma les formes i la
seua portabilitat; no prova encara text vinculat, retall o un flux de còmic complet.

L'objecte públic `_editorApi` que retorna Slides oferix guardat i exportació,
però no exposa directament `addShape`. No convé pressupostar una API de còmic
estable ni cridar controladors interns dispersos. Les dependències d'eXe s'han
de mantindre en l'adaptador i la versió actual continua fixada.

Fabric documenta [grups d'objectes](https://www.fabricjs.com/api/classes/group/),
[text amb ajust de línies](https://www.fabricjs.com/api/classes/textbox/) i
[màscares clipPath](https://www.fabricjs.com/docs/old-docs/clippath-part1/).
Són primitives útils; la facilitat d'edició i la compatibilitat de tota la cadena
de Llibres s'han de verificar amb proves pròpies. Els tutorials antics expliquen
el concepte de retall, però no s'ha de copiar literalment la seua API anterior.

## Arquitectura proposada

- Cada pàgina continua sent una escena Slides, amb les dimensions actuals de
  1280 × 720. Un còmic vertical o en A4 es pot valorar després; canviar totes les
  proporcions ara ampliaria les proves d'exportació i la interfície.
- Vinyetes rectangulars predefinides amb marges i ordre de lectura visibles.
  El marc queda protegit contra moviments accidentals; el contingut és editable.
- Bafarada composta per forma i text vinculats, amb una acció senzilla per a
  editar el diàleg. Moure-la o duplicar-la ha de mantindre els dos elements junts.
- Diàleg, pensament i cartutx de narració; sense començar amb un catàleg gran.
- Imatges pel mateix selector de Rebost. Les fonts, llicències i crèdits finals
  continuen viatjant amb el `.elpx`.
- Metadades opcionals versionades en `slideMeta` per a identificar vinyetes i
  bafarades; utilitzar només objectes Fabric estàndard. Evitar classes noves que
  necessiten registrar-se per a reobrir o exportar un llibre.
- Mantindre el format d'escena versió 3. No hi ha motiu verificat per a canviar
  el contenidor `.elpx` ni crear una API nova. Cal confirmar la conservació de
  metadades en tots els trajectes abans de fixar-ne l'esquema.

## On està la dificultat real

1. **Text i bafarada junts.** Fabric agrupa objectes, però entrar a editar un text
   dins d'un grup, redimensionar sense deformar-lo i mantindre la cua requerix
   decidir controls i interaccions. La forma nativa per si mateixa no resol això.
2. **Imatges dins de vinyetes.** Primer es poden ajustar a l'espai reservat; un
   retall que es conserve quan es mou el marc necessita més proves. `clipPath`
   disponible en Fabric i admés com a etiqueta no és una garantia d'exportació.
3. **Capacitat de desfer.** Inserir una bafarada amb diversos objectes hauria de
   ser una sola operació des del punt de vista de l'alumnat. Cal verificar la
   història existent, no donar per fet que agrupa les nostres operacions.
4. **Lectura.** Text massa menut amb quatre vinyetes, ordre ambigu i contingut
   fora del marc. Limitar plantilles i grandàries és millor que moltes opcions.
5. **Portabilitat.** Reobrir el `.elpx`, lector SVG, HTML/EPUB i publicació del Banc
   han de conservar bafarades, retalls i atribucions. La publicació rasteritza les
   pàgines: no assumir que l'edició i l'eixida rasteritzada seran idèntiques.

## Estimació orientativa

Dies de treball d'una persona familiaritzada amb este repositori, incloses les
proves focalitzades; no són terminis garantits ni inclouen esperes de revisió.

| Abast | Esforç estimat | Resultat |
|---|---|---|
| Prova de concepte | 1–2 dies | Una pàgina amb dues vinyetes, dues imatges i bafarades; guardat/reobertura i exportació verificats |
| Primera versió senzilla | 3–5 dies totals | Plantilles fixes, diàleg/pensament/narració, edició de text clara, Rebost i crèdits; sense retall avançat ni disseny lliure de vinyetes |
| Versió cuidada | 1–2 setmanes totals | Selecció i agrupació còmodes, duplicació, desfer coherent, ajust/retall de contingut i proves de tota la cadena |
| Editor avançat | Diverses setmanes addicionals | Vinyetes irregulars, cues editables amb punts, reorganització automàtica i disseny lliure |

La incertesa principal és la interacció entre agrupació, text i història de
Slides. La prova de concepte ha de confirmar-la abans de comprometre l'abast de
la versió cuidada. No s'ha fet una auditoria completa d'accessibilitat o rendiment
tàctil; l'ús en ordinador continua sent la prioritat acordada.

## Prova de concepte i decisió

Crear una pàgina de dues vinyetes amb dos personatges del Rebost, una bafarada de
diàleg i una de pensament. Escriure text llarg, moure i duplicar la bafarada,
guardar, tornar a obrir, descarregar `.elpx`, llegir i publicar contra una API
temporal. Verificar el mateix contingut i els crèdits, sense fitxers o peticions
externes. Comparar el resultat del retall en SVG i en la pàgina rasteritzada.

Adoptar el mode si este recorregut funciona amb l'adaptador i objectes estàndard,
sense tocar eXe i sense afegir una interfície difícil. Reduir el retall o la
llibertat de disseny si exigixen modificar el motor o mantenir eines fràgils.
No recomane desenvolupar un editor de còmic independent.
