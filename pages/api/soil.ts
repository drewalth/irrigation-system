// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { soilSensor } from "./controllers"
export default async (req, res) => {

  const reading = await soilSensor()
  console.log('reading :>> ', reading);
  res.status(200).json(reading)
}
