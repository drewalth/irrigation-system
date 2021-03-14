import ping from "./ping"
import valve from "./valve"
import db from "./db"

const routes = [
  ping,
  valve,
  db
]

export = (app) => {
  routes.forEach(route => {
    route(app)
  })
}