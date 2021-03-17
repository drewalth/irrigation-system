import dotenv from 'dotenv'
dotenv.config()
const apiPort = process.env.PORT || 3000
import express from 'express'
import routes from "./routes"
import middleware from "./middleware"
import cors from "cors"
import helmet from 'helmet'
import { initSystem, networkInfo } from "./lib"
import { valveController } from "./controllers"
const app = express()

app.use(cors({
  origin: 'http://192.168.86.55',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

app.use(helmet())

middleware(app)
routes(app)
initSystem()

const handleShutdown = async (error) => {
  console.log('-----------\nGracefully shutting down...\n')
  console.log(error)
  await valveController(false)
  console.log('Safely shutdown.\n-------------')
  process.exit(0)
}

app.listen(apiPort, () => {
  console.log(`Device API: http://${networkInfo.wlan0 && networkInfo.wlan0[0]}:${apiPort}`)
})

process.on('unhandledRejection', handleShutdown)
process.on('SIGINT', handleShutdown)
process.on('uncaughtException', handleShutdown)