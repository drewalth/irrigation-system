import ping from "./ping"
import valve from "./valve"

const routes = [
  ping,
  valve
]

export = (app) => {
  routes.forEach(route => {
    route(app)
  })
}