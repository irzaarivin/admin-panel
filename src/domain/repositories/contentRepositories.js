module.exports = async ({ Content }) => {
  return {
    findAll: async () => {
      return await Content.find().lean()
    },

    create: async (data) => {
      const content = new Content(data);
      return content.save();
    },

    updateById: async ({ id, payload }) => {
      const updated = await Content.findByIdAndUpdate(id, payload, { new: true })
      return updated
    },

    getById: async (id) => {
      return await Content.findById(id)
    }
  }
}
