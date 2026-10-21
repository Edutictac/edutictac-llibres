#!/usr/bin/env python3
"""Fetch the pinned official static engine; never modify upstream files."""
import hashlib
import json
from pathlib import Path, PurePosixPath
import stat
import urllib.request
import zipfile

ROOT = Path(__file__).resolve().parents[1]
config = json.loads((ROOT / 'upstream.json').read_text())
cache = ROOT / '.cache'
cache.mkdir(exist_ok=True)
archive = cache / 'exelearning-static-v4.0.5.zip'
if not archive.exists():
    temporary = archive.with_suffix('.download')
    urllib.request.urlretrieve(config['url'], temporary)
    temporary.rename(archive)
if hashlib.sha256(archive.read_bytes()).hexdigest() != config['sha256']:
    raise SystemExit('The upstream archive checksum does not match upstream.json')
target = ROOT / 'vendor' / 'exelearning'
target.mkdir(parents=True, exist_ok=True)
with zipfile.ZipFile(archive) as package:
    if sum(item.file_size for item in package.infolist()) > 600 * 1024 * 1024:
        raise SystemExit('Unexpected upstream archive size')
    for item in package.infolist():
        path = PurePosixPath(item.filename)
        if path.is_absolute() or '..' in path.parts or stat.S_ISLNK(item.external_attr >> 16):
            raise SystemExit('Unsafe upstream archive entry')
    package.extractall(target)
print('Official eXeLearning 4.0.5 static distribution verified and installed.')

import runpy
runpy.run_path(str(ROOT / "scripts" / "source-archive.py"), run_name="__main__")
