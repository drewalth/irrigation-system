
import { valveController, getWeather } from "../controllers"
import db from "../db/db.json"
import moment from 'moment'
import updateConfigFile from "./update-config"

const valveOpenDuration = 60000 / 2
let systemInterval

const waterPlants = async () => {
 
  await valveController(true)
  await new Promise(resolve => setTimeout(resolve, valveOpenDuration))
  await valveController(false)

  const now = moment(new Date())
  const scheduledWatering = moment(now).add(10, 'minutes')

  updateConfigFile({
    scheduledWatering
  })
  console.log(`Next Watering: ${moment(scheduledWatering).format('LLLL')}`)
}

const systemLoop = async () => {

  try {

    const timeSince = moment(new Date()).diff(db.scheduledWatering).toString()
console.log(`timeSince`, timeSince)
    if (timeSince.charAt(0) === '-') {
      console.log('not time to water...')
      return
    }

    console.log('-------------------\n\nFetching weather report\n\n-------------------')

    // pine colorado coordinates
    const weatherResults = await getWeather('39.463330', '-105.372220')

    updateConfigFile({
      weatherResults
    })

    const chanceOfPrecipitation = Math.floor(((weatherResults.hourly.map(hourlyReading => hourlyReading.pop).reduce((a: number, b: number) => a + b, 0) / weatherResults.hourly.length) * 100))

    if (chanceOfPrecipitation > 75) return

    await waterPlants()
    
  } catch (error) {
    console.log(`error`, error)
  }
}

export const initSystem = async () => {
  console.log('System Loop Started: ', moment(new Date()).format("LLLL"))
  await systemLoop()
  setInterval(systemLoop, ((60000) + 10)) // run every 8 hours? :: 60000 * 480
}

process.on('SIGINT', () => {
  clearInterval(systemInterval)
})