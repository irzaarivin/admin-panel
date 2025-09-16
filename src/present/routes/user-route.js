const express = require('express')
const userRoutes = express.Router()

module.exports = async (usersController, AuthChecker) => {
    userRoutes.use(AuthChecker)

    userRoutes.get('/', usersController.get)
    userRoutes.get('/stats', usersController.getStats)
    userRoutes.get('/find', usersController.getById)
    userRoutes.put('/:id', usersController.update)
    userRoutes.delete('/:id', usersController.ddelete)

    return userRoutes
};
