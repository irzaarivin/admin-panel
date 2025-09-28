const { routes, socket } = require('./present/routes/index')

// ======================================================================== //

const middlewares = {
    ErrorHandler: require('./present/middlewares/ErrorHandler'),
    AuthChecker: require('./present/middlewares/AuthChecker'),
    RoleChecker: require('./present/middlewares/RoleChecker'),
    SocketChecker: require('./present/middlewares/SocketAuth')
}

const helpers = {
    email: require('./app/helpers/email'),
    response: require('./app/helpers/response')
}

// ======================================================================== //

const model = async ({ Sequelize, sequelize, Model, DataTypes, mongoose }) => {
    const User = require('./domain/models/User')
    const Module = require('./domain/models/Module')
    const Submodule = require('./domain/models/submodule')
    const Content = require('./domain/models/Content')

    return {
        User: await User({ Sequelize, sequelize, Model, DataTypes }),
        Module: await Module({ Sequelize, sequelize, Model, DataTypes }),
        Submodule: await Submodule({ Sequelize, sequelize, Model, DataTypes }),
        Content: Content,
    }
}

// ======================================================================== //

const repository = async (models) => {
    const userRepositories = require('./domain/repositories/userRepositories')
    const moduleRepositories = require('./domain/repositories/moduleRepositories')
    const submoduleRepositories = require('./domain/repositories/submoduleRepositories')
    const contentRepositories = require('./domain/repositories/contentRepositories')

    return {
        userRepositories: await userRepositories(models),
        moduleRepositories: await moduleRepositories(models),
        submoduleRepositories: await submoduleRepositories(models),
        contentRepositories: await contentRepositories(models),
    }
}

// ======================================================================== //

const handler = async ({ repositories, helpers, emitSocketEvent, redis }) => {
    const users = require('./app/handlers/user/index')
    const socket = require('./app/handlers/socket/index')
    const auth = require('./app/handlers/auth/index')
    const modules = require('./app/handlers/module/index')
    const submodules = require('./app/handlers/submodule/index')
    const content = require('./app/handlers/content/index')

    return {
        user: await users(repositories, helpers, emitSocketEvent),
        socket: await socket(repositories, helpers, emitSocketEvent),
        auth: await auth(repositories, helpers, emitSocketEvent),
        module: await modules(repositories, helpers, emitSocketEvent),
        submodule: await submodules(repositories, helpers, emitSocketEvent),
        content: await content(repositories, helpers, emitSocketEvent),
    }
}

// ======================================================================== //

const controller = async (handlers) => {
    const usersController = require('./present/controllers/usersController')
    const socketController = require('./present/controllers/socketController')
    const authController = require('./present/controllers/authController')
    const moduleController = require('./present/controllers/moduleController')
    const submoduleController = require('./present/controllers/submoduleController')
    const contentController = require('./present/controllers/contentController')

    return {
        usersController: await usersController(await handlers.user),
        socketController: await socketController(await handlers),
        authController: await authController(await handlers.auth),
        moduleController: await moduleController(await handlers.module),
        submoduleController: await submoduleController(await handlers.submodule),
        contentController: await contentController(await handlers.content),
    }
}

// ======================================================================== //

module.exports = { model, repository, handler, controller, middlewares, helpers, routes, socket }