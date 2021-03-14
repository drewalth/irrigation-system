import {resetDb} from "../lib"

export = (app) => {
  app.get('/reset-db', (req, res) => {
    resetDb()
    res.send('db reset')
  })
}