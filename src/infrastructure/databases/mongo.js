const mongoose = require('mongoose')

module.exports = async (config) => {
  const uri = `mongodb://${config.development.host}:${config.development.mongo_port}/${config.development.database}`

  try {
    await mongoose.connect(uri)

    if (config.environment === 'development') {
      mongoose.set('debug', true)
    }

    console.log('MongoDB connected')
    return mongoose
  } catch (err) {
    console.error('MongoDB connection error:', err)
    throw err
  }
}
