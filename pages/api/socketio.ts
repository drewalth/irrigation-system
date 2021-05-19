import { Server } from 'socket.io'
import redisClient from './lib/redis-client'

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server)

    io.on('connection', (socket) => {
      socket.broadcast.emit('userConnected', socket.id)

      socket.on('valveToggle', (open) => {
        redisClient.set('valveActive', open)
        redisClient.get('valveActive', (err, data) => {
          socket.broadcast.emit('valveToggle', data)
        })
      })

      socket.on('disconnect', () => {
        socket.broadcast.emit('userDisconnected', socket.id)
      })
    })

    res.socket.server.io = io
  } else {
    console.log('socket.io already running')
  }
  res.end()
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default ioHandler
