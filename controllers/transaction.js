const {
  Transaction,
  TransactionProduct,
  Product,
  sequelize
} = require('../models')

class TransactionController {
  static async create (req, res, next) {
    const t = await sequelize.transaction()
    try {
      const { productsJSON } = req.body

      const transaction = await Transaction.create(
        {
          user_id: req.userData.id,
          transaction_date: new Date(),
          amount: 0,
          payment_method: 'cash',
          status: 'Pending'
        },
        { transaction: t }
      )

      let totalAmount = 0

      for (const { product_id, quantity } of productsJSON) {
        const product = await Product.findByPk(product_id, { transaction: t })

        if (!product) {
          throw { name: 'Not_Found' }
        }

        if (product.stock_quantity < quantity) {
          throw { name: 'Quantity_Exceeded' }
        }

        const totalProductPrice = product.price * quantity
        totalAmount += totalProductPrice

        await TransactionProduct.create(
          {
            transaction_id: transaction.id,
            product_id: product_id,
            quantity,
            total_price: totalProductPrice,
            user_id: req.userData.id
          },
          { transaction: t }
        )

        product.stock_quantity -= quantity
        await product.save({ transaction: t })
      }
      transaction.amount = totalAmount
      await transaction.save({ transaction: t })

      await t.commit()

      res.status(200).json({
        success: true,
        message: 'Transaction completed successfully.',
        transactionId: transaction.id,
        totalAmount: transaction.amount
      })
    } catch (err) {
      if (err.name === 'Not_Found') {
        res.status(404).json({ message: 'Product not found.' })
      } else if (err.name === 'Quantity_Exceeded') {
        res
          .status(400)
          .json({ message: 'Your quantity cannot exceed product quantity.' })
      } else {
        console.error('Transaction error:', err)
        res.status(500).json({ message: 'Transaction failed.' })
      }
      await t.rollback()
    }
  }

  static async getAllTransactions (req, res, next) {
    try {
      // Use findAll with include option to retrieve all transactions
      const transactions = await TransactionProduct.findAll({
        include: [
          {
            model: Transaction,
            include: [Product]
          }
        ]
      })

      res.status(200).json({
        success: true,
        transactions: transactions
      })
    } catch (err) {
      console.error('Error fetching transactions:', err)
      res.status(500).json({ message: 'Error fetching transactions.' })
    }
  }
}

module.exports = TransactionController
