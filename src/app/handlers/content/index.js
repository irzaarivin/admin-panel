const create = require('./create')

const content = async (repositories, helpers, emitSocketEvent) => {
    return {
        createContent: await create.bind(null, repositories, helpers),
    }
}

module.exports = content