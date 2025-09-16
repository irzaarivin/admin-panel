const { Op } = require('sequelize')

module.exports = async ({ User }) => {
    return {
        getUsers: async (params) => {
            try {
                const where = {}

                if (params.name) where.name = { [Op.like]: `%${params.name}%` };
                if (params.role) where.role = params.role.toLowerCase();

                return User.findAll({ where, attributes: { exclude: ['password'] } })
            } catch (error) {
                console.log({error})
                throw new Error(error)
            }
        },

        getOneUser: async (param) => {
            try {
                const user = await User.findOne({
                    where: param
                });
                return user;
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },

        findUserById: async (id) => {
            try {
                return await User.findByPk(id)
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },

        findUserByUsername: async (username) => {
            try {
                return await User.findOne({ where: { username } })
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },

        createUser: async (data) => {
            try {
                return await User.create(data)
            } catch (error) {
                console.log({error})
                throw new Error(error)
            }
        },

        updateUser: async (id, data) => {
            try {
                const [affectedCount, affectedRows] = await User.update(data, {
                    where: { id },
                    returning: true,
                })

                if (affectedCount === 0) return null
                return affectedRows[0]
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },

        deleteUser: async (id) => {
            try {
                const deletedCount = await User.destroy({ where: { id } })
                return deletedCount > 0
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        }
    }
}