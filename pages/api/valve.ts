// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {valveController} from "./controllers"
export default (req, res) => {

  console.log(req.query)

  valveController(req.query.open === 'true')
  
  res.status(200).json({ pong: 'John Doe' })
}
