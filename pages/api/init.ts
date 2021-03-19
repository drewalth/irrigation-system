// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { initSystem} from "./lib"
export default (req, res) => {

  
  initSystem()
  res.status(200).json({ message: 'Starting irrigation system...' })
}
