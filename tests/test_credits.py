"""Attribution identity, migration and layout against the real Fabric engine."""
import json
import zipfile
import xml.etree.ElementTree as ET

from playwright.sync_api import expect

from test_workshop import BASE, browser, create, idle, payloads
from test_rebost import fixture_api, choose


def test_credits_preserve_legacy_and_deduplicate_images(browser):
    context = browser.new_context()
    page = context.new_page()
    page.goto(BASE)
    result = page.evaluate('''async () => {
      const {collectCredits,migrateCredits}=await import('/credits.js');
      const id='img-'+'a'.repeat(64), id2='img-'+'b'.repeat(64);
      const old={type:'Textbox',text:'Zebra · Author · License',slideMeta:{rebostCreditId:id}};
      const objects=[{type:'Image',slideAssetName:'Zebra.png'},old,
        {type:'image',slideMeta:{rebostCredits:[{id:id2,text:'Abella · Author · License'}]}}];
      migrateCredits(objects);
      objects.push(structuredClone(objects[0]));
      return {entries:collectCredits(objects,'ca'),linked:objects[0].slideMeta.rebostCredits};
    }''')
    assert [c['text'].split(' · ')[0] for c in result['entries']] == ['Abella', 'Zebra']
    assert result['linked'][0]['id'] == 'img-' + 'a' * 64
    context.close()


def scenes(frame):
    return frame.evaluate("""eXeLearning.app.project._yjsBridge.documentManager.getNavigation().toJSON()
      .sort((a,b)=>a.order-b.order).map(p=>({id:p.id,name:p.pageName,data:JSON.parse(p.blocks[0].components[0].jsonProperties)}))""")


def final_entries(frame):
    data=scenes(frame)
    managed=[p for p in data if any(o.get('slideMeta',{}).get('llibresCreditsPage') for o in p['data']['fabric']['objects'])]
    assert len(managed)==1 and managed[0]['id']==data[-1]['id']
    for page in data[:-1]:
        assert not any(o.get('slideMeta',{}).get('rebostCreditsFooter') or o.get('slideMeta',{}).get('rebostCreditId') for o in page['data']['fabric']['objects'])
    return next(o['slideMeta']['rebostBookCredits'] for o in managed[0]['data']['fabric']['objects'] if 'rebostBookCredits' in o.get('slideMeta',{}))


def test_book_credits_are_deduplicated_sorted_and_stay_last_after_editing_and_reopen(browser,tmp_path):
    context=browser.new_context(viewport={'width':1440,'height':1000},accept_downloads=True)
    fixture_api(context);page=context.new_page();frame=create(page,'va')
    for i,(letter,name) in enumerate([('c','Zebra'),('b','Bosc'),('a','Ànec'),('c','Zebra')]):
        if i==1:page.locator('.page-tab').nth(1).click();idle(page)
        fixture_api(context,asset_id='img-'+letter*64,name=name,author='Autoria compartida amb una descripció llarga per a comprovar els salts de línia. '*3)
        page.click('#add-image');choose(page)
    entries=final_entries(frame)
    assert [e['text'].split(' · ')[0] for e in entries]==['Ànec','Bosc','Zebra']
    assert page.locator('.page-tab').count()==4
    credit_id=page.locator('.page-tab').last.get_attribute('data-id')
    page.locator('.page-tab').last.click();idle(page)
    for control in ['move-up','move-down','delete-page','rename-page','add-image','draw']:
        expect(page.locator('#'+control)).to_be_disabled()
    assert frame.evaluate("__slideEditorCanvas.getObjects().find(o=>o.slideMeta?.rebostBookCredits).top") ==145
    # A new story page is inserted before the managed final slide.
    page.click('#add-page');idle(page)
    assert page.locator('.page-tab').count()==5
    assert page.locator('.page-tab').last.get_attribute('data-id')==credit_id
    expect(page.locator('#move-down')).to_be_disabled()
    page.locator('.page-tab').nth(1).click();idle(page)
    frame.evaluate("__slideEditorCanvas.remove(__slideEditorCanvas.getObjects().find(o=>o.slideMeta?.rebostCredits?.[0].id==='img-'+'b'.repeat(64)))")
    page.click('#save-book');idle(page)
    assert len(final_entries(frame))==2
    assert 'Bosc' not in str(final_entries(frame))
    with page.expect_download(timeout=90000) as download:page.click('#download')
    target=tmp_path/'credits.elpx';download.value.save_as(target);idle(page)
    assert page.locator('.page-tab').count()==5
    context.close()
    other=browser.new_context(viewport={'width':1440,'height':1000})
    page=other.new_page();page.goto(BASE);page.set_input_files('#file-input',str(target));idle(page)
    frame=page.locator('#engine-host iframe').element_handle().content_frame()
    assert len(final_entries(frame))==2
    page.click('#read');idle(page)
    expect(page.locator('#reader-page')).not_to_contain_text('Autoria compartida')
    for _ in range(4):page.click('#next')
    expect(page.locator('#reader-page')).to_contain_text('Crèdits')
    expect(page.locator('#reader-page')).to_contain_text('Zebra')
    other.close()


def test_old_inline_credits_migrate_to_final_slide(browser,tmp_path):
    context=browser.new_context(viewport={'width':1440,'height':1000},accept_downloads=True)
    fixture_api(context);page=context.new_page();create(page)
    page.click('#add-image');choose(page)
    with page.expect_download(timeout=90000) as download:page.click('#download')
    original=tmp_path/'original.elpx';download.value.save_as(original);idle(page);context.close()
    legacy=tmp_path/'legacy.elpx'
    with zipfile.ZipFile(original) as source,zipfile.ZipFile(legacy,'w',zipfile.ZIP_DEFLATED) as target:
        for name in source.namelist():
            data=source.read(name)
            if name=='content.xml':
                root=ET.fromstring(data);ET.register_namespace('','http://www.intef.es/xsd/ode')
                nodes=[n for n in root.iter() if n.tag.endswith('}jsonProperties')]
                scene=json.loads(nodes[0].text)
                for obj in scene['fabric']['objects']:
                    for key in ['slideMeta','slideAssetName','slideAssetUrl']:obj.pop(key,None)
                scene['fabric']['objects'].append(dict(type='Textbox',text='Manzana · Synthetic test author · CC BY-SA 2.0',left=35,top=665,width=1210,fontSize=14))
                nodes[0].text=json.dumps(scene)
                data=ET.tostring(root,encoding='utf-8',xml_declaration=True)
            target.writestr(name,data)
    other=browser.new_context(viewport={'width':1440,'height':1000})
    page=other.new_page();page.goto(BASE);page.set_input_files('#file-input',str(legacy));idle(page)
    frame=page.locator('#engine-host iframe').element_handle().content_frame()
    assert len(final_entries(frame))==1
    assert page.locator('.page-tab').count()==4
    assert not frame.evaluate("__slideEditorCanvas.getObjects().some(o=>o.text?.includes('Synthetic test author'))")
    other.close()


def test_credits_follow_remaining_images_and_disappear_when_none_are_used(browser):
    context=browser.new_context(viewport={'width':1440,'height':1000})
    fixture_api(context);page=context.new_page();frame=create(page)
    for i in range(2):
        page.locator('.page-tab').nth(i).click();idle(page)
        page.click('#add-image');choose(page)
    assert len(final_entries(frame))==1
    # Removing a story page must not remove the credit of an image still used elsewhere.
    page.on('dialog',lambda d:d.accept())
    page.click('#delete-page');idle(page)
    assert len(final_entries(frame))==1
    assert page.locator('.page-tab').count()==3
    frame.evaluate("__slideEditorCanvas.remove(...__slideEditorCanvas.getObjects().filter(o=>o.type==='image'))")
    page.click('#save-book');idle(page)
    assert page.locator('.page-tab').count()==2
    assert all(not any(o.get('slideMeta',{}).get('llibresCreditsPage') for o in p['data']['fabric']['objects']) for p in scenes(frame))
    context.close()
