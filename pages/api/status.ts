import redisClient from './lib/redis-client'

export default async (req, res) => {
  redisClient.get('valveActive', (err, data) => {
    res.status(200).json({ active: data })
  })
}
