import {
  valveController,
  getWeather,
  rainSensor,
  getSoilReadings,
} from '../controllers'
import moment from 'moment'

let systemInterval

/*
  @TODO hook this up to db

  - may (probably will) require change to prisma schema and/or timeslot CRUD.
  - daily interval. ignore date, only concerned with time.
  - other intervals. if not currently watering and last water time is great than 7 or 30 days.

 */
let timeSlots = [
  {
    startTime: '05:45:00',
    valveOpenDuration: 60000 * 30,
    active: false,
  },
  {
    startTime: '20:00:00',
    valveOpenDuration: 60000 * 30,
    active: false,
  },
]

let isRaining = false
let rainCheckTimer
let soilCheckTimer

const { LATITUDE, LONGITUDE } = process.env

const isTimeBetween = (startTime: string, duration: number): boolean => {
  const format = 'hh:mm:ss'
  const time = moment(),
    beforeTime = moment(startTime, format),
    afterTime = moment(startTime, format).add(duration / 60000, 'minutes')

  return time.isBetween(beforeTime, afterTime)
}

const runIrrigationSystem = async () => {
  isRaining = await rainSensor()

  const weatherResults = await getWeather(LATITUDE, LONGITUDE)

  const chanceOfPrecipitation = () => {
    // for dev
    if (weatherResults) {
      return Math.floor(
        (weatherResults.hourly
          .map((hourlyReading) => hourlyReading.pop)
          .reduce((a: number, b: number) => a + b, 0) /
          weatherResults.hourly.length) *
          100
      )
    }

    return 50
  }

  timeSlots.forEach(async (slot, index) => {
    if (
      !slot.active &&
      !isRaining &&
      isTimeBetween(slot.startTime, slot.valveOpenDuration) &&
      chanceOfPrecipitation() < 90
    ) {
      timeSlots[index].active = true

      rainCheckTimer = setInterval(async () => {
        isRaining = await rainSensor()

        if (isRaining) {
          await valveController(false)
          timeSlots[index].active = false
          clearInterval(rainCheckTimer)
        }
      }, 5000)

      soilCheckTimer = setInterval(async () => {
        const soilReadings = await getSoilReadings()

        if (soilReadings.every((reading) => reading === 0)) {
          await valveController(false)
          timeSlots[index].active = false
          clearInterval(soilCheckTimer)
        }
      }, 5000)

      await valveController(true)
      await new Promise((resolve) =>
        setTimeout(resolve, slot.valveOpenDuration)
      )
      await valveController(false)
      timeSlots[index].active = false
      clearInterval(rainCheckTimer)
    }
  })
}

export const initSystem = async () => {
  await runIrrigationSystem()
  systemInterval = setInterval(runIrrigationSystem, 60000 * 2)
}

process.on('SIGINT', () => {
  clearInterval(systemInterval)
})
