#!/bin/bash
# Run this on the VPS (root@72.60.127.124)
# Sets up Chrome + screenshot service

set -e

echo "=== Installing Chrome ==="
apt-get update
apt-get install -y wget gnupg2
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list
apt-get update
apt-get install -y google-chrome-stable

echo "=== Setting up screenshot service ==="
mkdir -p /var/www/screenshot
cd /var/www/screenshot

# Copy files (assumes you've scp'd them here already)
# Or paste server.js and package.json manually

# Install Node deps
npm install --production

echo "=== Setting up PM2 process ==="
pm2 start server.js --name "screenshot" --env SCREENSHOT_SECRET="asc-screenshot-2026"
pm2 save

echo "=== Setting up Nginx proxy ==="
cat > /etc/nginx/sites-available/screenshot <<'NGINX'
server {
    listen 80;
    server_name screenshot.adamsilvaconsulting.com;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 30s;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/screenshot /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

echo "=== Done! ==="
echo "Test: curl http://localhost:3001/health"
echo "Next: Add DNS A record for screenshot.adamsilvaconsulting.com → $(curl -s ifconfig.me)"
echo "Then: certbot --nginx -d screenshot.adamsilvaconsulting.com"
