require('dotenv').config({path:__dirname+'/./../../../.env'});

module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  secret: process.env.SECRET || 'anjay-gacor-kang',
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  development: {
    // MySQL
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'template',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',

    // MongoDB
    mongo_host: process.env.MONGO_HOST || 'localhost',
    mongo_port: process.env.MONGO_PORT || 27017,
    mongo_database: process.env.MONGO_DB || 'vrbnnode',
    mongo_user: process.env.MONGO_USER || '',
    mongo_pass: process.env.MONGO_PASS || '',
    mongo_authSource: process.env.MONGO_AUTHSOURCE || 'admin',

    // Redis
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
};
