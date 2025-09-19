const Joi = require('joi')
const bcrypt = require('bcrypt')
const { generateToken } = require('../../utils/jwt')

const validate = async (data) => {
  const schema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).messages({
      'string.email': 'Format email tidak valid!',
    }),

    username: Joi.string().min(3).messages({
      'string.min': 'Username minimal harus 3 karakter!',
    }),

    password: Joi.string().min(6).required().messages({
      'string.empty': 'Password tidak boleh kosong!',
      'string.min': 'Password minimal harus 6 karakter!',
      'any.required': 'Password diperlukan!'
    })
  }).or('email', 'username').messages({
    'object.missing': 'Email atau username diperlukan!',
  })

  const { error } = schema.validate(data, { abortEarly: false })
  return error
}

module.exports = async (repositories, helpers, emitSocketEvent, data) => {
  const { response } = helpers
  const { getOneUser } = repositories.userRepositories
  const { email, username, password } = data

  const validation = await validate(data)
  if (validation) return response.invalidData(validation)

  const query = email ? { email } : { username }
  const user = await getOneUser(query)
  if (!user) return response.notFound("User tidak ditemukan!")

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return response.unauthorized("Kredensial tidak valid!")

  const token = generateToken({ id: user.id, email: user.email, role: user.role })
  return response.success({ token })
}
