"""Textual attribution URLs are content; SVG resource URLs remain forbidden."""
import pytest
from test_workshop import BASE, browser


@pytest.mark.parametrize(('content', 'valid'), [
    ('<text>Scratch: http://scratch.mit.edu · CC-BY-SA-2.0</text>', True),
    ('<text>Source: https://example.invalid/credits</text>', True),
    ('<image href="https://example.invalid/private.png" />', False),
    ('<image href="http://www.w3.org/private.png" />', False),
    ('<image xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://example.invalid/private.png" />', False),
    ('<style>@import "https://example.invalid/style.css";</style>', False),
    ('<rect style="fill:url(https://example.invalid/image.svg)" />', False),
    ('<script>window.__unsafe=1</script>', False),
    ('<foreignObject><p>HTML</p></foreignObject>', False),
    ('<rect onload="window.__unsafe=1" />', False),
    ('<a href="javascript:window.__unsafe=1">link</a>', False),
])
def test_credit_text_urls_and_svg_resources(browser, content, valid):
    context = browser.new_context()
    page = context.new_page(); page.goto(BASE)
    result = page.evaluate('''async content => {
      const {inspectBook} = await import('/import.js');
      const scene = {engine:'fabric', version:3, width:1280, height:720,
        fabric:{objects:[]}, svg:'<svg xmlns="http://www.w3.org/2000/svg">'+content+'</svg>'};
      const xml = '<ode><odeNavStructure/><odeIdeviceTypeName>slide</odeIdeviceTypeName>'+
        '<jsonProperties><![CDATA['+JSON.stringify(scene)+']]></jsonProperties></ode>';
      const archive = fflate.zipSync({'content.xml':new TextEncoder().encode(xml)});
      try {await inspectBook(archive.buffer); return true;} catch {return false;}
    }''', content)
    assert result is valid
    assert page.evaluate('window.__unsafe') is None
    context.close()


@pytest.mark.parametrize(('descriptor','valid'),[
    ({'type':'layoutManager','strategy':'fit-content'},True),
    ({'type':'arbitrary-layout','strategy':'fit-content'},False),
    ({'type':'layoutManager','strategy':'arbitrary-layout'},False),
    ({'type':'layoutManager','strategy':'fit-content','options':{'src':'https://example.invalid'}},False),
])
def test_standard_group_layout_descriptor_only(browser,descriptor,valid):
    context=browser.new_context();page=context.new_page();page.goto(BASE)
    accepted=page.evaluate('''async descriptor => {
      const scene={engine:'fabric',version:3,width:1280,height:720,
        fabric:{objects:[{type:'Group',layoutManager:descriptor,objects:[]}]},svg:''};
      const xml='<ode><odeNavStructure/><odeIdeviceTypeName>slide</odeIdeviceTypeName><jsonProperties><![CDATA['+JSON.stringify(scene)+']]></jsonProperties></ode>';
      const bytes=fflate.zipSync({'content.xml':new TextEncoder().encode(xml)});
      try {await (await import('/import.js')).inspectBook(bytes.buffer);return true;}catch{return false;}
    }''',descriptor)
    assert accepted is valid
    context.close()
