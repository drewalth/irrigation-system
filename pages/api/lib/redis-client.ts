import redis from 'redis'
const redisClient = redis.createClient()

redisClient.on('error', function (error) {
  console.error('error: ', error)
})

export default redisClient
