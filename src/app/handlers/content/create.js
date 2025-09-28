const Joi = require('joi')

const validate = async (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required().messages({
      'string.empty': 'Title tidak boleh kosong!',
      'string.min': 'Title minimal harus 3 karakter!',
      'any.required': 'Title diperlukan!'
    }),
    description: Joi.string().required().messages({
      'string.empty': 'Deskripsi tidak boleh kosong!',
      'any.required': 'Deskripsi diperlukan!'
    }),
    pdf: Joi.string().required().messages({
      'string.empty': 'PDF tidak boleh kosong!',
      'any.required': 'PDF diperlukan!'
    }),
    steps: Joi.array().items(
      Joi.object({
        order: Joi.number().required().messages({
          'number.base': 'Order harus angka!',
          'any.required': 'Order diperlukan!'
        }),
        action: Joi.string().required().messages({
          'string.empty': 'Action tidak boleh kosong!',
          'any.required': 'Action diperlukan!'
        }),
        expected: Joi.string().required().messages({
          'string.empty': 'Expected tidak boleh kosong!',
          'any.required': 'Expected diperlukan!'
        }),
      })
    ).min(1).required().messages({
      'array.base': 'Steps harus berupa array!',
      'array.min': 'Steps minimal 1!',
      'any.required': 'Steps diperlukan!'
    }),
    subModule: Joi.number().required().messages({
      'number.base': 'SubModule ID harus berupa angka!',
      'any.required': 'SubModule diperlukan!'
    })
  })

  const { error } = schema.validate(data, { abortEarly: false })
  return error
}

module.exports = async (repositories, helpers, data) => {
  try {
    const { response } = helpers
    const { create } = repositories.contentRepositories
    const { getOne: getSubmodule } = repositories.submoduleRepositories

    const validation = await validate(data)
    if (validation) return response.invalidData(validation)

    const subModuleExists = await getSubmodule({ id: data.subModule })
    if (!subModuleExists) return response.notFound('Submodule tidak ditemukan!')

    const createdContent = await create(data)

    if (createdContent) return response.success(createdContent)
    return response.serverError(createdContent)
  } catch (error) {
    throw Error(error)
  }
}
