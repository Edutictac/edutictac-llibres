/* Sample built with the same adapter and standard groups used by the workshop. */
import {Editor} from '/adapter.js';
import {fetchImage} from '/rebost.js';
import {panelBoxes} from '/comic.js';
const ids={
  frog:'img-a38888de1aadf490ae3496d884e4e96e5dc0cea1f7803c82d4469a2ca7aba047',
  butterfly:'img-4fe6c75aa1d8b760c5f896603dd9f2186549f9a52042a5b876a511029a4a64fd',
  duck:'img-b8b04fa7fe4ad146066faa1c3d89390c56654b7b702e91314f319f39b4dfba5f',
  woods:'img-32cffc180612b3d2a7020ce4cba972be07aead45c2524b2b2a471057a874ba8f',
};
const pages=[
  {name:'Comença amb una idea',layout:2,panels:[['frog','speech','No sé com començar el meu còmic.'],['butterfly','speech','Conta allò que t’agrada!']]},
  {name:'Imagina i dibuixa',layout:3,panels:[['frog','narration','Al bosc, cada criatura té una història.'],['butterfly','thought','Ja ho tinc! Una aventura de colors.'],['duck','speech','Jo també vull eixir al còmic!']]},
  {name:'El final el tries tu',layout:4,panels:[['frog','speech','Afig un personatge.'],['butterfly','speech','Escriu què diu.'],['duck','thought','Què passarà després?'],['frog','narration','Ara inventa un altre final!']]},
];

export async function buildDemo() {
  const frame=document.createElement('iframe');frame.id='engine';frame.src='/engine/index.html';
  frame.style='width:1500px;height:1000px';document.body.replaceChildren(frame);
  const editor=new Editor(frame);await editor.ready();
  await editor.create('La granota i la idea brillant','comic','va',2);
  editor.manager.getMetadata().set('author','EduTicTac');
  const images={},provenance=[];
  for(const [key,id] of Object.entries(ids)) {
    images[key]=await fetchImage(id,'va');
    const {source,licenseText,...credit}=images[key].credit;provenance.push(credit);
    console.info('demo: image '+key);
  }
  async function image(key,box) {
    await editor.image(images[key].file,images[key].credit);
    const canvas=await editor.drawing(false),object=canvas.getActiveObject();
    const scale=Math.min(box.width/object.width,box.height/object.height);
    object.set({left:box.left+(box.width-object.width*scale)/2,top:box.top+(box.height-object.height*scale)/2,scaleX:scale,scaleY:scale});
    object.setCoords();canvas.discardActiveObject();canvas.requestRenderAll();
  }
  await image('woods',{left:750,top:350,width:440,height:300});
  await image('frog',{left:880,top:460,width:190,height:170});
  await editor.flush();
  for(const [index,page] of pages.entries()) {
    console.info('demo: page '+page.name);
    const id=index===0?editor.contentPages()[1].id:await editor.addPage(page.name,page.layout);
    await editor.rename(id,page.name);
    const canvas=await editor.drawing(false);
    const heading=canvas.getObjects().find(o=>o.type==='textbox'&&!o.slideMeta?.comicPanelLabel);
    heading.set('text',page.name);
    for(const [panel,[character,kind,text]] of page.panels.entries()) {
      editor.comicPanelIndex=panel;
      const box=panelBoxes(page.layout)[panel];
      if(page.layout!==4) await image('woods',{left:box.left+10,top:box.top+155,width:box.width-20,height:box.height-175});
      const size=page.layout===4?95:130;
      await image(character,{left:box.left+box.width*.25,top:box.top+box.height-size-20,width:box.width*.5,height:size});
      await editor.writeBubble({kind,text});
    }
    await editor.flush();
  }
  const bytes=new Uint8Array(await editor.save()),slides=await editor.slides();
  let binary='';for(let start=0;start<bytes.length;start+=16384)binary+=String.fromCharCode(...bytes.subarray(start,start+16384));
  return {base64:btoa(binary),slides:slides.map(p=>({...p,svg:DOMPurify.sanitize(p.svg,{USE_PROFILES:{svg:true,svgFilters:true},ADD_TAGS:['image'],ADD_DATA_URI_TAGS:['image'],ADD_ATTR:['href']})})),provenance};
}
