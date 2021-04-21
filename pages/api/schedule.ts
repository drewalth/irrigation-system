import { prisma } from './lib'

export default async (req, res) => {
  let status = 200
  let payload

  switch (req.method) {
    case 'POST':
      payload = await prisma.timeSlot
        .create({
          data: { ...req.body },
        })
        .catch((e) => {
          status = 500
          payload = e
        })
      break
    default:
      payload = await prisma.timeSlot.findMany()
  }

  res.status(status).json(payload)
}
