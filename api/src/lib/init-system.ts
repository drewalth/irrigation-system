
import { valveController, getWeather, rainSensor, laser } from "../controllers"
import moment from 'moment'

let systemInterval

let timeSlots = [
  {
    startTime: '05:45:00',
    valveOpenDuration: (60000 * 30),
    active: false
  },
  {
    startTime: '20:00:00',
    valveOpenDuration: (60000 * 30),
    active: false
  }
]

let isRaining = false
let rainCheckTimer

const isTimeBetween = (startTime: string, duration: number): boolean => {
  const format = 'hh:mm:ss'
  const time = moment(),
    beforeTime = moment(startTime, format),
    afterTime = moment(startTime, format).add((duration / 60000), 'minutes');

  return time.isBetween(beforeTime, afterTime)
}

const runIrrigationSystem = async () => {

  await laser(true)
  isRaining = await rainSensor()

  // pine colorado coordinates
  const weatherResults = await getWeather('39.463330', '-105.372220')

  const chanceOfPrecipitation = Math.floor(((weatherResults.hourly.map(hourlyReading => hourlyReading.pop).reduce((a: number, b: number) => a + b, 0) / weatherResults.hourly.length) * 100))

  timeSlots.forEach(async (slot, index) => {
    if (!slot.active && !isRaining && isTimeBetween(slot.startTime, slot.valveOpenDuration) && (chanceOfPrecipitation < 90)) {
      timeSlots[index].active = true

      rainCheckTimer = setInterval(async () => {
        isRaining = await rainSensor()

        if (isRaining) {
          await valveController(false)
          timeSlots[index].active = false
          clearInterval(rainCheckTimer)
        }

      }, 5000)


      await valveController(true)
      await new Promise(resolve => setTimeout(resolve, slot.valveOpenDuration))
      await valveController(false)
      timeSlots[index].active = false
      clearInterval(rainCheckTimer)
    }
  })
}

export const initSystem = async () => {
  await runIrrigationSystem()
  systemInterval = setInterval(runIrrigationSystem, 30000)
}

process.on('SIGINT', () => {
  laser()
  clearInterval(systemInterval)
})