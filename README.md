# Install dependencies
npm install

# Serve with hot reload at localhost:9528
```
open config/dev.env.js
set API_ROOT: '"//${server_ip}:5000"'
npm run dev
```
# Build for production with minification
```
open config/prod.env.js
set API_ROOT: '"//${server_ip}:5000"'
npm run build
```
# Build for production and view the bundle analyzer report
npm run build --report

# Update Proto
```
update src/proto/
npm run proto
```