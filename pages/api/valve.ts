// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {

  console.log(`req.query`, req.query)
  res.status(200).json({ pong: 'John Doe' })
}
