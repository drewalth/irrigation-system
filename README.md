# irrigation-system

[![Build Status](https://travis-ci.com/drewalth/irrigation-system.svg?branch=main)](https://travis-ci.com/drewalth/irrigation-system) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/7c069ab53e41404798e0ead12ca9d1d9)](https://www.codacy.com/gh/drewalth/irrigation-system/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=drewalth/irrigation-system&amp;utm_campaign=Badge_Grade)

A DIY smart irrigation system for Raspberry Pi built with [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [Socket.io](https://socket.io/) and [Redis](https://redis.io/). Inspired by this guide on Instructables, [Raspberry Pi Controlled Irrigation System](https://www.instructables.com/Raspberry-Pi-Controlled-Irrigation-System/). See full project description [here](https://www.drewalth.com/irrigation).

![Image of Irrigation System UI](https://www.drewalth.com/static/irrigation-04-acd9fe22dc775a1a48842b37b54ba552.png)

## Hardware Requirements

- [Raspberry Pi - 4b](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/)
- [Soil Moisture Sensors](https://www.amazon.com/gp/product/B07QXZC8TQ/ref=ppx_yo_dt_b_asin_title_o03_s00?ie=UTF8&psc=1)
- [Rain Sensors](https://www.amazon.com/gp/product/B01DK29K28/ref=ppx_yo_dt_b_asin_image_o00_s00?ie=UTF8&psc=1)

For the full circuit components list see the [Instructables project](https://www.instructables.com/Raspberry-Pi-Controlled-Irrigation-System/).

## System Requirements

- [Node.js](https://nodejs.org/en/)
- [Docker](https://docs.docker.com/get-docker/)

## Getting Started

```bash
# install dependencies
npm ci

# start redis
npm run redis:start

# start development
npm run dev

# compile for prod
npm run build

# start prod 
npm start 
```

## Env Vars

Add the latitude and longitude of where you're going to be running the system to the `.env.local` file. This is a helpful site to get lat + long from the address: [latlong.net](https://www.latlong.net/convert-address-to-lat-long.html).

## Tokens

If you want to use SMS notifications with [Twilio](https://www.twilio.com/), sign up on their platform and add account tokens to the `.env`.

You will need an API token from [Open Weather Map](https://openweathermap.org/api). If you decide to use another weather API, you'll most likely have to change the logic around chance-of-precipitation to make it work.

## Note

This project is still a work-in-progress. There is plenty of room for improvement. PR's welcome.
