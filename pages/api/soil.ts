import { getSoilReadings } from './controllers'
export default async (req, res) => {
  const readings = await getSoilReadings()

  res.status(200).json(readings)
}
