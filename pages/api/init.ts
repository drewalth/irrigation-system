// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { initSystem} from "./lib"
export default async (req, res) => {


  await initSystem()
  res.status(200).json({ message: 'Starting irrigation system...' })
}
