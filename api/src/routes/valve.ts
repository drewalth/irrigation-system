import {valveController} from "../lib"

export = (app) => {
  app.get('/valve-open', (req, res) => {
    valveController(true)

    res.send('valve open')
    
  })

  app.get('/valve-close', (req, res) => {
    valveController(false)

    res.send('valve closed')

  })
}