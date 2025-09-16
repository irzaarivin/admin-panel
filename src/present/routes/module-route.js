const express = require('express')
const moduleRoutes = express.Router()

module.exports = async (moduleController, AuthChecker) => {
    moduleRoutes.use(AuthChecker)

    moduleRoutes.post('/', moduleController.create)

    return moduleRoutes
};
