// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {valveController} from "./controllers"
export default async (req, res) => {

  // don't send sms if valve manually toggled from UI
  await valveController(req.query.open === 'true', false)

  res.status(200).json({watering:req.query.open === 'true'})
}
