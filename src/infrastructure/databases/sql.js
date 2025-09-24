const { Sequelize } = require('sequelize')

module.exports = (config) => {
    try {
        const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
            host: config.development.host,
            dialect: config.development.dialect,
            port: config.development.port,
            logging: config.environment === 'development' ? console.log : false,
        })

        if (sequelize) console.log('MySQL Connected')
        return { sequelize, Sequelize }
    } catch(error) {
        console.error('MySQL connection error : ', error)
        throw Error(error)
    }
}