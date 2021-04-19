import { initSystem } from './lib'
export default async (req, res) => {
  await initSystem()
  res.status(200).json({ message: 'Starting irrigation system...' })
}
