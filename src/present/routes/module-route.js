const express = require('express')
const multer = require('multer')

const moduleRoutes = express.Router()
const upload = multer({ dest: 'uploads/imports/modules/' })

module.exports = async (moduleController, AuthChecker) => {
    moduleRoutes.use(AuthChecker)

    moduleRoutes.post('/', moduleController.create)
    moduleRoutes.get('/', moduleController.getAll)
    moduleRoutes.put('/:id', moduleController.update)
    moduleRoutes.delete('/:id', moduleController.deleteOne)
    moduleRoutes.post('/import', upload.single('file'), moduleController.imports)

    return moduleRoutes
};
