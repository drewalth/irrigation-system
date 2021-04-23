# irrigation-system

[![Build Status](https://travis-ci.com/drewalth/irrigation-system.svg?branch=main)](https://travis-ci.com/drewalth/irrigation-system) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/7c069ab53e41404798e0ead12ca9d1d9)](https://www.codacy.com/gh/drewalth/irrigation-system/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=drewalth/irrigation-system&amp;utm_campaign=Badge_Grade)

A [Next.js](https://nextjs.org/) app built with [Typescript](https://www.typescriptlang.org/) and [rpio](https://www.npmjs.com/package/rpio) to control a DIY irrigation system from a Raspberry Pi. Inspired by this guide on Instructables, [Raspberry Pi Controlled Irrigation System](https://www.instructables.com/Raspberry-Pi-Controlled-Irrigation-System/).

![Image of Irrigation System UI](https://www.drewalth.com/static/irrigation-04-acd9fe22dc775a1a48842b37b54ba552.png)

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

If you want to use SMS notifictions with [Twilio](https://www.twilio.com/), sign up on their platform and add account tokens to the `.env`.

You will need an API token from [Open Weather Map](https://openweathermap.org/api). If you decide to use another weather API, you'll most likely have to change the logic around chance-of-precipitation to make it work.

## Note

This project is still a work-in-progress. There is plenty of room for improvement. PR's welcome.
