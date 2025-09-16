const { routes, socket } = require('./present/routes/index')

// ======================================================================== //

const middlewares = {
    ErrorHandler: require('./present/middlewares/ErrorHandler'),
    AuthChecker: require('./present/middlewares/AuthChecker'),
    SocketChecker: require('./present/middlewares/SocketAuth')
}

const helpers = {
    email: require('./app/helpers/email'),
    response: require('./app/helpers/response')
}

// ======================================================================== //

const model = async (Sequelize, sequelize, mongoose) => {
    const User = require('./domain/models/User')
    const Module = require('./domain/models/Module')

    return {
        User: await User(Sequelize, sequelize),
        Module: await Module(Sequelize, sequelize),
    }
}

// ======================================================================== //

const repository = async (models) => {
    const userRepositories = require('./domain/repositories/userRepositories')
    const moduleRepositories = require('./domain/repositories/moduleRepositories')

    return {
        userRepositories: await userRepositories(models),
        moduleRepositories: await moduleRepositories(models),
    }
}

// ======================================================================== //

const handler = async (repositories, helpers, emitSocketEvent) => {
    const users = require('./app/handlers/user/index')
    const socket = require('./app/handlers/socket/index')
    const auth = require('./app/handlers/auth/index')
    const modules = require('./app/handlers/module/index')

    return {
        user: await users(repositories, helpers, emitSocketEvent),
        socket: await socket(repositories, helpers, emitSocketEvent),
        auth: await auth(repositories, helpers, emitSocketEvent),
        module: await modules(repositories, helpers, emitSocketEvent),
    }
}

// ======================================================================== //

const controller = async (handlers) => {
    const usersController = require('./present/controllers/usersController')
    const socketController = require('./present/controllers/socketController')
    const authController = require('./present/controllers/authController')
    const moduleController = require('./present/controllers/moduleController')

    return {
        usersController: await usersController(await handlers.user),
        socketController: await socketController(await handlers),
        authController: await authController(await handlers.auth),
        moduleController: await moduleController(await handlers.module),
    }
}

// ======================================================================== //

module.exports = { model, repository, handler, controller, middlewares, helpers, routes, socket }