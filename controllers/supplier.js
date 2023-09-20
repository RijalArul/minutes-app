const { MethodSequelizeCRUD } = require('../helpers/methodSequelizeCrud')
const { PayloadRequestSupplier } = require('../helpers/payloadRequest')
const { createPayload } = new PayloadRequestSupplier()
const { Supplier } = require('../models')

class SupplierController {
  static async create (req, res, next) {
    try {
      const { supplier_name } = req.body
      const payloadCreateSupplier = createPayload(supplier_name)
      const createMethod = new MethodSequelizeCRUD(Supplier, 'create')
      const newSupplier = await createMethod.createModels(payloadCreateSupplier)

      res.status(201).json(newSupplier)
    } catch (err) {
      next(err)
    }
  }

  static async getAll (req, res, next) {
    try {
      const getAllMethod = new MethodSequelizeCRUD(Supplier, 'findAll')
      const suppliers = await getAllMethod.findAllModels()
      res.status(200).json(suppliers)
    } catch (err) {
      next(err)
    }
  }

  static async get (req, res, next) {
    try {
      const { id } = req.params
      const getMethod = new MethodSequelizeCRUD(Supplier, 'findOne')
      const supplier = await getMethod.findOneModels({ id })

      if (!supplier) {
        throw { name: 'Not_Found' }
      }

      res.status(200).json(supplier)
    } catch (err) {
      err['type'] = 'Supplier'
      next(err)
    }
  }

  static async update (req, res, next) {
    try {
      const { id } = req.params
      const { supplier_name } = req.body
      const updatePayload = createPayload(supplier_name)
      const updateMethod = new MethodSequelizeCRUD(Supplier, 'update')
      const updateSupplier = await updateMethod.updateModels(
        { id: id },
        updatePayload
      )

      res.status(200).json(updateSupplier)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = SupplierController
