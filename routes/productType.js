const { ProductTypeController } = require('../controllers/productType')

const productTypeRouter = require('express').Router()

productTypeRouter.get('/', ProductTypeController.getAll)
productTypeRouter.post('/', ProductTypeController.create)
productTypeRouter.get('/:id', ProductTypeController.get)
productTypeRouter.put('/:id', ProductTypeController.update)

module.exports = productTypeRouter
