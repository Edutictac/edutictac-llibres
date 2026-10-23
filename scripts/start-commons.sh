#!/bin/sh
set -eu
COMMONS_PORTAL_PORT=${COMMONS_PORTAL_PORT:-8082}
case "$COMMONS_PORTAL_PORT" in ''|*[!0-9]*) exit 1;; esac
[ "$COMMONS_PORTAL_PORT" -ge 1 ] && [ "$COMMONS_PORTAL_PORT" -le 65535 ]
export COMMONS_PORTAL_PORT
envsubst '${COMMONS_PORTAL_PORT}' < /etc/nginx/llibres-local.template > /tmp/llibres-local.conf
exec nginx -c /tmp/llibres-local.conf -g 'daemon off;'
