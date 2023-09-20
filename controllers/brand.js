const { MethodSequelizeCRUD } = require('../helpers/methodSequelizeCrud')
const { PayloadRequestBrand } = require('../helpers/payloadRequest')
const { createPayload } = new PayloadRequestBrand()
// const { PayloadRequestBrand } = require("../helpers/payloadRequest")
const { Brand } = require('../models')

class BrandController {
  static async create (req, res, next) {
    try {
      const { brand_name } = req.body
      const payloadCreateBrand = createPayload(brand_name)
      const createMethod = new MethodSequelizeCRUD(Brand, 'create')
      const newBrand = await createMethod.createModels(payloadCreateBrand)

      res.status(201).json(newBrand)
    } catch (err) {
      next(err)
    }
  }

  static async getAll (req, res, next) {
    try {
      const getAllMethod = new MethodSequelizeCRUD(Brand, 'findAll')
      const brands = await getAllMethod.findAllModels()
      res.status(200).json(brands)
    } catch (err) {
      next(err)
    }
  }

  static async get (req, res, next) {
    try {
      const { id } = req.params
      const getMethod = new MethodSequelizeCRUD(Brand, 'findOne')
      const brand = await getMethod.findOneModels({ id })

      if (!brand) {
        throw { name: 'Not_Found' }
      }

      res.status(200).json(brand)
    } catch (err) {
      err['type'] = 'Brand'
      next(err)
    }
  }

  static async update (req, res, next) {
    try {
      const { id } = req.params
      const { brand_name } = req.body
      const updatePayload = createPayload(brand_name)
      const updateMethod = new MethodSequelizeCRUD(Brand, 'update')
      const updateBrand = await updateMethod.updateModels(
        { id: id },
        updatePayload
      )

      res.status(200).json(updateBrand)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = BrandController
