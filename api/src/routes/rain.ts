import { rainSensor } from "../controllers"

export = (app) => {
  app.get('/rain-sensor', async (req, res) => {
    try {
      const result = await rainSensor()
      console.log(`result`, result)
      res.send(result)

    } catch (error) {
      console.log(`error`, error)
    }
  })
}