#!/usr/bin/env python3
"""Build the Valencian sample through eXe; only read public Rebost assets."""
import argparse
import base64
import hashlib
import html
import json
from pathlib import Path
from urllib.parse import urlsplit

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'public/examples/la-papallona'


def build(origin):
    origin = origin.rstrip('/')
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
        context = browser.new_context(viewport={'width':1600,'height':1100})
        def read_only(route):
            request = route.request
            if request.method not in ('GET','HEAD') or urlsplit(request.url).netloc != urlsplit(origin).netloc:
                return route.abort()
            return route.continue_()
        context.route('**/*', read_only)
        context.route('**/__build-demo.js', lambda r:r.fulfill(path=ROOT/'scripts/demo-story.js',content_type='text/javascript'))
        page = context.new_page()
        page.on('console', lambda message: print(message.text,flush=True) if message.text.startswith('demo:') else None)
        page.goto(origin+'/?lang=va')
        result = page.evaluate("async () => await Promise.race([(await import('/__build-demo.js')).buildDemo(), new Promise((_,reject)=>setTimeout(()=>reject(new Error('demo generation timeout')),240000))])")
        browser.close()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    data=base64.b64decode(result['base64'])
    (OUTPUT/'la-papallona.elpx').write_bytes(data)
    slides=result['slides']
    sections='\n'.join(f'<section id="pagina-{i}"><h2>{html.escape(p["title"])}</h2>{p["svg"]}</section>' for i,p in enumerate(slides,1))
    title='La papallona i els colors del bosc'
    document=f'''<!doctype html>
<html lang="ca-valencia"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data:; style-src 'unsafe-inline'; base-uri 'none'">
<title>{title} · EduTicTac Llibres</title>
<style>body{{margin:0;background:#f8f5ee;color:#193f38;font:18px system-ui}}header,footer{{max-width:1120px;margin:auto;padding:24px}}header nav{{display:flex;gap:20px;flex-wrap:wrap}}a{{color:#245e4b}}main{{max-width:1280px;margin:auto}}section{{margin:24px 12px 48px}}h2{{font-size:20px}}svg{{display:block;width:100%;height:auto;background:white;border-radius:18px;box-shadow:0 6px 24px #193f3820}}@media print{{nav{{display:none}}section{{break-after:page}}}}</style>
<header><p>EDUTICTAC LLIBRES · CONTE DE MOSTRA EN VALENCIÀ</p><h1>{title}</h1>
<nav><a href="/?lang=va">Torna a Llibres</a><a href="la-papallona.elpx" download>Descarrega el llibre editable (.elpx)</a></nav>
<p>Llig el conte i, si vols, obri una còpia en Llibres per a canviar els textos, moure les imatges o dibuixar un altre final.</p></header>
<main>{sections}</main><footer><p>Text i dibuix: EduTicTac. Imatges: catàleg públic Scratch del Rebost; autoria i origen als crèdits del llibre.</p><p>Conte i adaptacions: CC BY-SA 2.0. La font original de cada imatge i la llicència completa s’inclouen en el fitxer editable.</p></footer></html>'''
    (OUTPUT/'index.html').write_text(document)
    with sync_playwright() as playwright:
        browser=playwright.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
        page=browser.new_page(viewport={'width':1304,'height':900})
        page.set_content(document)
        page.locator('section svg').first.screenshot(path=str(OUTPUT/'cover.png'))
        browser.close()
    (OUTPUT/'provenance.json').write_text(json.dumps({'title':title,'language':'va','license':'CC-BY-SA-2.0','author':'EduTicTac','pages':len(slides),'elpx_sha256':hashlib.sha256(data).hexdigest(),'images':result['provenance']},ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({'pages':len(slides),'rebost_images':len(result['provenance']),'elpx_bytes':len(data)}))


if __name__ == '__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--origin',default='https://llibres.edutictac.es')
    build(parser.parse_args().origin)
