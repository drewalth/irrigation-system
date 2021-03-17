# irrigation-system
 
## API

### Build + Deploy

```
# update package.json
scp package.json pi@192.168.86.40:/home/pi/app/package.json

# update env
scp .env pi@192.168.86.40:/home/pi/app/.env 

# build and upload
npm run build && cd dist && zip -r app.zip . && scp app.zip pi@192.168.86.40:/home/pi/app && cd .. && scp package.json pi@192.168.86.40:/home/pi/app/package.json && scp .env pi@192.168.86.40:/home/pi/app/.env

ssh pi@192.168.86.40

# from pi /app
unzip app.zip && npm install --production && node index.js

```