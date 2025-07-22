#!/bin/sh
# entrypoint.sh

ROOT_DIR=/usr/share/nginx/html

echo "Replacing placeholder in JS files..."
for file in $ROOT_DIR/assets/*.js;
do
  sed -i "s|%%VITE_API_BASE_URL%%|${VITE_API_BASE_URL}|g" $file
done

echo "Starting Nginx..."

exec nginx -g 'daemon off;'