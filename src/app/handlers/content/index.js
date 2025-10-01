const create = require('./create')
const get = require('./get')
const update = require('./update')

const content = async (repositories, helpers, emitSocketEvent) => {
    return {
        createContent: await create.bind(null, repositories, helpers),
        getContent: await get.bind(null, repositories, helpers),
        updateContent: await update.bind(null, repositories, helpers),
    }
}

module.exports = content