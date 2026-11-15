#!/usr/bin/env bash
# Copia @edutictac/rebost-client a public/rebost-client/ (se sirve tal cual, sin build). Uso: scripts/sync-rebost-client.sh [ruta-al-paquete]
set -euo pipefail
SRC="${1:-$(dirname "$0")/../../edutictac-rebost-client}"
DST="$(dirname "$0")/../public/rebost-client"
mkdir -p "$DST"
cp "$SRC/src/index.js" "$SRC/src/selection.js" "$DST/"
echo "// copiado de @edutictac/rebost-client $(git -C "$SRC" rev-parse --short HEAD); no editar aquí" > "$DST/VERSION.txt"
