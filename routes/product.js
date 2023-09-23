const ProductController = require('../controllers/product')
const { authentication } = require('../middlewares/auth')
const {
  imagePostValidation,
  uploadSingle,
  imagePutValidation
} = require('../middlewares/upload-image')

const productRouter = require('express').Router()

productRouter.use(authentication)
productRouter.post(
  '/',
  uploadSingle,
  imagePostValidation,
  ProductController.create
)

productRouter.get('/', ProductController.getAll)
productRouter.get('/:id', ProductController.get)
productRouter.put(
  '/:id',
  uploadSingle,
  imagePutValidation,
  ProductController.update
)

module.exports = productRouter
