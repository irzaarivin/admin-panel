module.exports = async (moduleHandler) => {
    const { createModule } = await moduleHandler

    const create = async (req, res, next) => {
        try {
            const data = req.body
            const result = await createModule(data)
            res.status(result.statusCode).json(result.data)
        } catch (err) {
            next(err)
        } 
    }

    return { create }
}