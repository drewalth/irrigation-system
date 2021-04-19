import { getSoilReadings } from './controllers'
export default async (req, res) => {
  const readings = await getSoilReadings()
  console.log(typeof readings)
  res.status(200).json(readings)
}
