const Joi = require('joi')
const bcrypt = require('bcrypt')

const validate = async (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required().messages({
      'string.empty': 'Module tidak boleh kosong!',
      'string.min': 'Module minimal harus 3 karakter!',
      'any.required': 'Module diperlukan!'
    }),
  })

  const { error } = schema.validate(data, { abortEarly: false })
  return error
}

module.exports = async (repositories, helpers, data) => {
  const { response } = helpers
  const { create } = repositories.moduleRepositories

  const validation = await validate(data)
  if (validation) return response.invalidData(validation)

  const createdModule = await create(data)

  if (createdModule) return response.success(createdModule)
  return response.serverError(createdModule)
}
