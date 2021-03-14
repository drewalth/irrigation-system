import { valveController } from "../controllers"

export = (app) => {
  app.get('/valve-open', async (req, res) => {
    await valveController(true)

    res.send('valve open')
  })

  app.get('/valve-close', async (req, res) => {
    await valveController(false)

    res.send('valve closed')

  })
}