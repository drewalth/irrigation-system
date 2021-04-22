import { prisma } from './lib'

export default async (req, res) => {
  let status = 200
  let payload

  switch (req.method) {
    case 'POST':
      if (req.query.slotId) {
        payload = await prisma.timeSlot.update({
          where: {
            id: Number(req.query.slotId),
          },
          data: { ...req.body },
        })
      } else {
        payload = await prisma.timeSlot
          .create({
            data: { ...req.body },
          })
          .catch((e) => {
            status = 500
            payload = e
          })
      }
      break
    case 'DELETE':
      payload = await prisma.timeSlot.delete({
        where: {
          id: Number(req.query.slotId),
        },
      })
      break
    default:
      payload = await prisma.timeSlot.findMany()
  }

  res.status(status).json(payload)
}
