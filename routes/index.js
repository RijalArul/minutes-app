const errorHandler = require('../middlewares/errorHandler')
const brandRouter = require('./brand')
const productRouter = require('./product')
const productTypeRouter = require('./productType')
const supplierRouter = require('./supplier')
const transactionRouter = require('./transaction')
const userRouter = require('./user')

const indexRouter = require('express').Router()

indexRouter.use('/users', userRouter)
indexRouter.use('/product_types', productTypeRouter)
indexRouter.use('/brands', brandRouter)
indexRouter.use('/suppliers', supplierRouter)
indexRouter.use('/products', productRouter)
indexRouter.use('/transactions', transactionRouter)
indexRouter.use(errorHandler)

module.exports = indexRouter
