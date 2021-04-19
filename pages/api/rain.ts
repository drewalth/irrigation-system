const { NODE_ENV } = process.env

export default async (req, res) => {
  if (NODE_ENV === 'development') {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    res.status(200).json([1])
    return
  }

  res.status(200).json([1])
}
