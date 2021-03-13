# irrigation-system
 
## API

### Build + Deploy

```
# update package.json
scp package.json pi@192.168.86.40:/home/pi/app/package.json

# build and upload
npm run build && cd dist && zip -r app.zip . && scp app.zip pi@192.168.86.40:/home/pi/app

# unzip
ssh pi@192.168.86.40

cd app && unzip app.zip .

# ssh into the pi then remove app dir
rm -rf app/

unzip app.zip

npm install --production
```

