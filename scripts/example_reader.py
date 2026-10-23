"""Publish sample slides for the shared reader and preserve existing public URLs."""
import html
import json


def write_example_reader(output, slug, title, slides):
    if slug not in ('la-granota', 'la-papallona'):
        raise ValueError('Unknown sample')
    (output/'slides.json').write_text(json.dumps({
        'format':'llibres-example','version':1,'title':title,'language':'va','slides':slides,
    },ensure_ascii=False)+'\n')
    target='/?lang=va&example='+slug
    (output/'index.html').write_text(f'''<!doctype html>
<html lang="ca-valencia"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="refresh" content="0;url={html.escape(target,quote=True)}">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; base-uri 'none'">
<title>{html.escape(title)} · EduTicTac Llibres</title>
<h1>{html.escape(title)}</h1><p><a href="{html.escape(target,quote=True)}">Obri el lector de Llibres</a></p>
<p><a href="{slug}.elpx" download>Descarrega el llibre editable</a></p></html>''')
