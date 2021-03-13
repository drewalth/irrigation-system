import express from 'express'
import routes from "./routes"
import cors from "cors"
import helmet from 'helmet'
const app = express()

app.use(cors({
  origin: 'http://192.168.86.55',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

app.use(helmet())

routes(app)

app.listen(3000, () => {
  console.log('App listening on port 3000.')
})
