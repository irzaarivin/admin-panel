// USER HANDLERS
const createModule = require('./create')

// BIND ALL HANDLER BY USE CASE
const modules = async (repositories, helpers, emitSocketEvent) => {
    return {
        createModule: await createModule.bind(null, repositories, helpers),
    }
}

module.exports = modules