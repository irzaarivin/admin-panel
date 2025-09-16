const { Op } = require('sequelize')

module.exports = async ({ Module }) => {
    return {
        createModule: async (data) => {
            try {
                return await Module.create(data)
            } catch (error) {
                console.log({error})
                throw new Error(error)
            }
        }
    }
}