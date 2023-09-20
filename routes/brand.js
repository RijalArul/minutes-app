const BrandController = require('../controllers/brand')

const brandRouter = require('express').Router()

brandRouter.post('/', BrandController.create)
brandRouter.get('/', BrandController.getAll)
brandRouter.get('/:id', BrandController.get)
brandRouter.put('/:id', BrandController.update)

module.exports = brandRouter
