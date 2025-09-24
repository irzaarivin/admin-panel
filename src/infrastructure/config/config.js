require('dotenv').config({path:__dirname+'/./../../../.env'});

module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  secret: process.env.SECRET || 'anjay-gacor-kang',
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'template',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
    mongo_port: process.env.MONGO_PORT || 27017,
    redis_port: process.env.REDIS_PORT || 6379,
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME_TEST || 'template_test',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME_PROD || 'template_prod',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
  },
  // mongo: {
  //   url: process.env.MONGO_URL || 'mongodb://localhost:27017/template',
  // },
};
