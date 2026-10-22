FROM nginxinc/nginx-unprivileged:1.27-alpine
LABEL org.opencontainers.image.title="EduTicTac Llibres" \
      org.opencontainers.image.licenses="AGPL-3.0-or-later" \
      org.opencontainers.image.source="https://git.edutictac.es/Edutictac/edutictac-llibres"
COPY public /usr/share/nginx/html
COPY vendor/exelearning/static /opt/exelearning
COPY nginx.production.conf /etc/nginx/conf.d/default.conf
COPY LICENSE upstream.json /usr/share/nginx/html/licenses/
