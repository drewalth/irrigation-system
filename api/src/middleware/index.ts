import requestLogger from "./request-logger"

const middlewares = [
  requestLogger
]

export = (app) => {
  middlewares.forEach(middleware => {
    middleware(app)
  })
}