const TransactionController = require('../controllers/transaction')
const { authentication } = require('../middlewares/auth')

const transactionRouter = require('express').Router()

transactionRouter.use(authentication)
transactionRouter.post('/', TransactionController.create)
transactionRouter.get('/', TransactionController.getAllTransactions)

module.exports = transactionRouter
