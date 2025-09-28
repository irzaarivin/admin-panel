const express = require('express')
const contentRoutes = express.Router()

module.exports = async (contentController, AuthChecker) => {
    contentRoutes.use(AuthChecker)

    contentRoutes.post('/', contentController.create)

    return contentRoutes
};
