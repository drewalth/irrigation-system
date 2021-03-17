import ping from "./ping"
import valve from "./valve"
import rain from "./rain"

const routes = [
  ping,
  valve,
  rain
]

export = (app) => {
  routes.forEach(route => {
    route(app)
  })
}