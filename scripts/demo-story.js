/* Run only by build-demo.py inside a disposable browser, using the real adapter. */
import {Editor} from '/adapter.js';
import {fetchImage} from '/rebost.js';

const assets = {
  sky: 'img-19ef2806c092ee839d0419ac8eab5b1472e702cdc499f34dad51f42e6ca6855a',
  woods: 'img-32cffc180612b3d2a7020ce4cba972be07aead45c2524b2b2a471057a874ba8f',
  butterfly: 'img-4fe6c75aa1d8b760c5f896603dd9f2186549f9a52042a5b876a511029a4a64fd',
  frog: 'img-a38888de1aadf490ae3496d884e4e96e5dc0cea1f7803c82d4469a2ca7aba047',
  duck: 'img-b8b04fa7fe4ad146066faa1c3d89390c56654b7b702e91314f319f39b4dfba5f',
};
const pages = [
  {name:'Portada', title:'La papallona\ni els colors\ndel bosc', body:'Un conte per a mirar, imaginar\ni transformar.', background:'sky', animal:'butterfly'},
  {name:'Un matí al bosc', title:'Un matí al bosc', body:'Ona, una papallona curiosa,\nvolava entre els arbres.\n\nVolia descobrir quin era\nel color més bonic del bosc.', background:'woods', animal:'butterfly'},
  {name:'El verd de la granota', title:'El verd de la granota', body:'—Mira les fulles! —va dir\nla granota—. El verd és ple\nde vida.\n\nOna va dibuixar una fulla\nal seu quadern.', background:'woods', animal:'frog'},
  {name:'El blau de l’estany', title:'El blau de l’estany', body:'A la vora de l’aigua, un ànec\nmirava el cel.\n\n—El blau guarda els núvols\ndins de l’estany —va dir.\n\nOna va somriure.', background:'sky', animal:'duck'},
  {name:'Tots els colors compten', title:'Tots els colors compten', body:'Ona ja tenia la resposta:\ncap color era millor que un altre.\nJunts feien més bonic el bosc.\n\nAra et toca a tu!\nDibuixa una flor i inventa\nun altre final per al conte.', background:'sky', animal:'butterfly', flower:true},
];

export async function buildDemo() {
  const frame=document.createElement('iframe');frame.id='engine';frame.src='/engine/index.html';
  frame.style='width:1500px;height:1000px';document.body.replaceChildren(frame);
  const editor=new Editor(frame);await editor.ready();
  console.info('demo: engine ready');
  await editor.create('La papallona i els colors del bosc','blank','va');
  editor.manager.getMetadata().set('author','EduTicTac');
  const downloaded={}, provenance=[];
  for(const [key,id] of Object.entries(assets)) {
    downloaded[key]=await fetchImage(id,'va');
    const {source,licenseText,...credit}=downloaded[key].credit;
    provenance.push(credit);
    console.info('demo: image '+key);
  }
  const f=editor.window.fabric;
  for(const [index,page] of pages.entries()) {
    console.info('demo: page '+page.name);
    const id=index===0?editor.contentPages()[0].id:await editor.addPage(page.name);
    await editor.rename(id,page.name);
    let canvas=await editor.drawing(false);canvas.clear();canvas.backgroundColor='#faf5e9';
    const origin={originX:'left',originY:'top'};
    const text=(value,left,top,width,size,extra={})=>canvas.add(new f.Textbox(value,{...origin,left,top,width,fontFamily:'Arial',fontSize:size,fill:'#193f38',lineHeight:1.25,...extra}));
    canvas.add(new f.Rect({...origin,left:660,top:40,width:580,height:640,rx:28,ry:28,fill:'#e4ebdc'}));
    async function image(key,left,top,width,height) {
      const item=downloaded[key];await editor.image(item.file,item.credit);
      canvas=await editor.drawing(false);
      const object=canvas.getActiveObject();
      const scale=Math.min(width/object.width,height/object.height);
      object.set({left:left+(width-object.width*scale)/2,top:top+(height-object.height*scale)/2,scaleX:scale,scaleY:scale});
      object.setCoords();canvas.discardActiveObject();canvas.requestRenderAll();
    }
    await image(page.background,680,60,540,600);
    await image(page.animal,820,290,330,280);
    if(index!==0 && page.animal!=='butterfly')await image('butterfly',1040,140,120,120);
    text('UN CONTE DE MOSTRA · EDUTICTAC LLIBRES',60,55,570,16,{charSpacing:70});
    text(page.title,60,130,580,index===0?62:44,{fontWeight:'bold'});
    text(page.body,60,index===0?390:230,570,index===0?29:30);
    text('Imatges del Rebost · Text i dibuix editables',60,645,570,17,{fill:'#526b62'});
    text(String(index+1).padStart(2,'0'),1170,635,50,20,{fill:'#193f38'});
    if(page.flower) {
      canvas.add(new f.Path('M 790 610 Q 780 540 810 490 M 790 565 Q 740 525 735 550 Q 755 580 790 565', {...origin,fill:'',stroke:'#245e4b',strokeWidth:8,strokeLineCap:'round'}));
      for(const [x,y] of [[790,460],[820,475],[810,510],[775,510],[760,475]])
        canvas.add(new f.Circle({...origin,left:x-19,top:y-19,radius:19,fill:'#de795a'}));
      canvas.add(new f.Circle({...origin,left:775,top:472,radius:17,fill:'#f6cc6d'}));
    }
    canvas.requestRenderAll();await editor.flush();
  }
  const bytes=new Uint8Array(await editor.save());
  console.info('demo: saved');
  const slides=await editor.slides();
  let binary='';for(let start=0;start<bytes.length;start+=16384)binary+=String.fromCharCode(...bytes.subarray(start,start+16384));
  return {base64:btoa(binary),slides:slides.map(p=>({...p,svg:DOMPurify.sanitize(p.svg,{USE_PROFILES:{svg:true,svgFilters:true},ADD_TAGS:['image'],ADD_DATA_URI_TAGS:['image'],ADD_ATTR:['href']})})),provenance};
}
