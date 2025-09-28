module.exports = async ({ Content }) => {
  return {
    findAll: async (filter = {}) => {
      return Content.find(filter).sort({ createdAt: -1 });
    },

    findById: async (id) => {
      return Content.findById(id);
    },

    create: async (data) => {
      const content = new Content(data);
      return content.save();
    },

    update: async (id, data) => {
      return Content.findByIdAndUpdate(id, data, { new: true });
    },

    delete: async (id) => {
      return Content.findByIdAndDelete(id);
    }
  }
}
