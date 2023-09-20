const SupplierController = require('../controllers/supplier')

const supplierRouter = require('express').Router()

supplierRouter.post('/', SupplierController.create)
supplierRouter.get('/', SupplierController.getAll)
supplierRouter.get('/:id', SupplierController.get)
supplierRouter.put('/:id', SupplierController.update)

module.exports = supplierRouter
