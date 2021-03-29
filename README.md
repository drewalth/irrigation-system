# irrigation-system

A [Next.js](https://nextjs.org/) app built with [Typescript](https://www.typescriptlang.org/) and [rpio](https://www.npmjs.com/package/rpio) to control a DIY irrigation system from a Raspberry Pi. Inspired by this guide on Instructables, [Raspberry Pi Controlled Irrigation System](https://www.instructables.com/Raspberry-Pi-Controlled-Irrigation-System/). 

## Getting Started
 
```bash
# install dependencies
npm ci

# start development
npm run dev

# compile for prod
npm run build

# start prod 
npm start 
```

## Env Vars

Add the latitude and longitude of where you're going to be running the system to the `.env.local` file. This is a helpful site to get lat + long from address: [latlong.net](https://www.latlong.net/convert-address-to-lat-long.html).

## Tokens

You will need an API token from [Open Weather Map](https://openweathermap.org/api). If you decide to use another weather API, you'll most likely have to change the logic around chance-of-precipitation to make it work.
