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
  const { createModule } = repositories.moduleRepositories

  const validation = await validate(data)
  if (validation) return response.invalidData(validation)

  data.password = await bcrypt.hash(data.password, 10)
  const createdModule = await createModule(data)

  return response.success(createdModule)
}
