const { MethodSequelizeCRUD } = require('../helpers/methodSequelizeCrud')
const { PayloadRequestProduct } = require('../helpers/payloadRequest')
const { Product } = require('../models')
const { createPayload } = new PayloadRequestProduct()
class ProductController {
  static async create (req, res, next) {
    try {
      const {
        product_name,
        description,
        price,
        stock_quantity,
        product_type_id,
        brand_id,
        supplier_id,
        status
      } = req.body

      const image = `http://localhost:3000/uploads/${req.file.filename}`

      const payload = createPayload(
        product_name,
        description,
        price,
        stock_quantity,
        image,
        product_type_id,
        brand_id,
        supplier_id,
        status
      )
      const createModelsMethod = new MethodSequelizeCRUD(Product, 'create')
      const newProduct = await createModelsMethod.createModels(payload)
      res.status(201).json(newProduct)
    } catch (err) {
      next(err)
    }
  }

  static async getAll (req, res, next) {
    try {
      let { page, limit } = req.query
      const getAllMethod = new MethodSequelizeCRUD(Product, 'findAll')
      const products = await getAllMethod.findAllModels(page, limit)
      res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  }

  static async get (req, res) {
    try {
      const { id } = req.params
      const getAllMethod = new MethodSequelizeCRUD(Product, 'findOne')
      const products = await getAllMethod.findOneModels({ id: id })

      if (!products) {
        throw { name: 'Not_Found' }
      }

      res.status(200).json(products)
    } catch (err) {
      err['type'] = 'Product'
      next(err)
    }
  }

  static async update (req, res, next) {
    try {
      const { id } = req.params
      const {
        product_name,
        description,
        price,
        stock_quantity,
        product_type_id,
        brand_id,
        supplier_id,
        status
      } = req.body

      const image = `http://localhost:3000/uploads/${req.file.filename}`

      const payload = createPayload(
        product_name,
        description,
        price,
        stock_quantity,
        image,
        product_type_id,
        brand_id,
        supplier_id,
        status
      )
      const updateModelsMethod = new MethodSequelizeCRUD(Product, 'update')
      const updateProduct = await updateModelsMethod.updateModels(
        { id: id },
        payload
      )

      res.status(200).json(updateProduct)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ProductController
