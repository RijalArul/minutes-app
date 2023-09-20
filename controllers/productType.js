const { MethodSequelizeCRUD } = require('../helpers/methodSequelizeCrud')
const { ProductType } = require('../models')
const { PayloadRequestProductType } = require('../helpers/payloadRequest')
const { createPayload, updatePayload, updateStatusPayload } =
  new PayloadRequestProductType()
class ProductTypeController {
  static async create (req, res, next) {
    try {
      const { type_name, description, status } = req.body
      const payloadCreateProductType = createPayload(
        type_name,
        description,
        status
      )

      const createModelsMethod = new MethodSequelizeCRUD(ProductType, 'create')
      const newProductType = await createModelsMethod.createModels(
        payloadCreateProductType
      )

      res.status(201).json(newProductType)
    } catch (err) {
      next(err)
    }
  }
  static async getAll (req, res, next) {
    try {
      let { page, limit } = req.query
      const getAllMethod = new MethodSequelizeCRUD(ProductType, 'findAll')
      const productTypes = await getAllMethod.findAllModels(page, limit)
      res.status(200).json(productTypes)
    } catch (err) {
      next(err)
    }
  }

  static async get (req, res, next) {
    try {
      const { id } = req.params
      const getAllMethod = new MethodSequelizeCRUD(ProductType, 'findOne')
      const productType = await getAllMethod.findOneModels({ id: id })

      if (!productType) {
        throw { name: 'Not_Found' }
      }

      res.status(200).json(productType)
    } catch (err) {
      err['type'] = 'Product'
      next(err)
    }
  }

  static async update (req, res, next) {
    try {
      const { id } = req.params
      const { status_query } = req.query
      const { type_name, description, status } = req.body
      let payloadUpdateType = updatePayload(type_name, description, status)

      if (status_query) {
        payloadUpdateType = updateStatusPayload(status_query)
      }

      const updateMethod = new MethodSequelizeCRUD(ProductType, 'update')
      const updateProductType = await updateMethod.updateModels(
        { id: id },
        payloadUpdateType
      )

      res.status(200).json(updateProductType)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = {
  ProductTypeController
}
