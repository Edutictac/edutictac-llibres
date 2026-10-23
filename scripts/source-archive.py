#!/usr/bin/env python3
"""Make Llibres' corresponding source available without private data."""
from pathlib import Path
import zipfile

root = Path(__file__).resolve().parents[1]
out = root / 'public' / 'source' / 'llibres-source.zip'
out.parent.mkdir(exist_ok=True)
paths = [root / p for p in ('README.md', 'LICENSE', 'Dockerfile', 'Dockerfile.local', 'nginx.commons.conf', '.dockerignore', 'compose.production.yml', 'nginx.production.conf', 'package.json', 'package-lock.json', 'vite.config.js', 'upstream.json', 'compose.yml', 'compose.rebost.yml', 'compose.publication.yml', 'nginx.conf', 'nginx.rebost.conf', 'nginx.publication.conf', '.gitignore')]
for folder in ('public', 'scripts', 'tests', 'docs', 'src', 'deploy'):
    paths.extend(p for p in (root / folder).rglob('*') if p.is_file() and 'source' not in p.relative_to(root).parts and '__pycache__' not in p.parts and '.pytest_cache' not in p.parts)
with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as package:
    for path in sorted(set(paths)):
        package.write(path, 'edutictac-llibres/' + str(path.relative_to(root)))
print('Source archive created; no vendor, browser data or credentials included.')
