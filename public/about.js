import { preferredLocale } from '/locale.js';

const translations = {
  es: {
    title: 'Acerca de',
  },
  va: {
    title: 'Sobre Llibres',
    intro: 'Crea llibres il·lustrats i còmics amb textos, imatges i dibuixos. Els teus llibres es guarden en este navegador quan prems Guarda; descarrega una còpia per a conservar-los.',
    free: 'Programari lliure',
    licenses: 'EduTicTac Llibres i eXeLearning: AGPL-3.0-or-later. iDevice Slide: CC BY-SA 4.0. Fabric.js: MIT. DOMPurify: MPL-2.0 o Apache-2.0. fflate: MIT.',
    interface: 'Interfície: Vue 3.5.44,',
    mit: 'llicència MIT',
    notices: 'Es conserven els avisos originals de cada component.',
    source: 'Codi font i instruccions',
    upstream: 'Codi original d’eXeLearning 4.0.5',
    release: 'Distribució oficial',
    slide: 'Llicència de Slide',
    rebost: 'Els catàlegs públics del Rebost es poden consultar sense compte. Les teues imatges personals requerixen entrar amb el teu compte d’EduTicTac. Les imatges incorporades al llibre conserven els seus crèdits i llicències.',
    publish: 'El professorat pot publicar llibres en el Banc de recursos. L’alumnat envia els seus llibres al seu docent perquè els revise i aprove abans de publicar-los. L’exportació EPUB és experimental.',
  },
  ca: {
    title: 'Sobre Llibres',
    intro: 'Crea llibres il·lustrats i còmics amb textos, imatges i dibuixos. Els teus llibres es guarden en aquest navegador quan prems Desa; descarrega una còpia per conservar-los.',
    free: 'Programari lliure',
    licenses: 'EduTicTac Llibres i eXeLearning: AGPL-3.0-or-later. iDevice Slide: CC BY-SA 4.0. Fabric.js: MIT. DOMPurify: MPL-2.0 o Apache-2.0. fflate: MIT.',
    interface: 'Interfície: Vue 3.5.44,',
    mit: 'llicència MIT',
    notices: 'Es conserven els avisos originals de cada component.',
    source: 'Codi font i instruccions',
    upstream: 'Codi original d’eXeLearning 4.0.5',
    release: 'Distribució oficial',
    slide: 'Llicència de Slide',
    rebost: 'Els catàlegs públics del Rebost es poden consultar sense compte. Les teves imatges personals requereixen entrar amb el teu compte d’EduTicTac. Les imatges incorporades al llibre conserven els seus crèdits i llicències.',
    publish: 'El professorat pot publicar llibres al Banc de recursos. L’alumnat envia els seus llibres al seu docent perquè els revisi i aprovi abans de publicar-los. L’exportació EPUB és experimental.',
  },
  en: {
    title: 'About',
    intro: 'Create illustrated books and comics with text, images and drawings. Your books are saved in this browser when you press Save; download a copy to keep them.',
    free: 'Free software',
    licenses: 'EduTicTac Llibres and eXeLearning: AGPL-3.0-or-later. Slide iDevice: CC BY-SA 4.0. Fabric.js: MIT. DOMPurify: MPL-2.0 or Apache-2.0. fflate: MIT.',
    interface: 'Interface: Vue 3.5.44,',
    mit: 'MIT license',
    notices: 'The original notices for each component are preserved.',
    source: 'Source code and instructions',
    upstream: 'Original eXeLearning 4.0.5 source code',
    release: 'Official release',
    slide: 'Slide license',
    rebost: 'You can browse public Rebost catalogs without an account. Your personal images require signing in with your EduTicTac account. Images included in a book keep their credits and licenses.',
    publish: 'Teachers can publish books in the Banc de recursos. Pupils send their books to their teacher for review and approval before publication. EPUB export is experimental.',
  },
};
const original = new Map([...document.querySelectorAll('[data-about]')].map(node => [node, node.textContent]));
function translate() {
  const locale = preferredLocale();
  const text = translations[locale];
  document.documentElement.lang = locale === 'va' ? 'ca-valencia' : locale;
  document.title = text.title + ' · EduTicTac Llibres';
  for (const [node, fallback] of original) node.textContent = text[node.dataset.about] || fallback;
  document.querySelector('#back-home').href = '/?lang=' + locale;
}
translate();
window.addEventListener('pageshow', translate);
window.addEventListener('focus', translate);
