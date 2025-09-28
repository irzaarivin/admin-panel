module.exports = async ({ createContent }) => {
  const create = async (req, res, next) => {
    try {
      const result = await createContent(req.body)
      res.status(result.statusCode).json(result.data)
    } catch (err) {
      next(err)
    }
  }

  return { create }
}
