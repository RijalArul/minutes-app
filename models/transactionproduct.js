const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class TransactionProduct extends Model {
    static associate (models) {
      TransactionProduct.belongsTo(models.Product, {
        foreignKey: 'product_id'
      })

      // Associate TransactionProduct with Transaction
      TransactionProduct.belongsTo(models.Transaction, {
        foreignKey: 'transaction_id'
      })
    }
  }

  TransactionProduct.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'User ID must be an integer.'
          }
        }
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Product ID must be an integer.'
          }
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Quantity must be an integer.'
          }
        }
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2), // Allow decimal format with 2 decimal places
        allowNull: false,
        validate: {
          isDecimal: {
            msg: 'Total price must be in decimal format.'
          },
          min: {
            args: [0.01], // Minimum value for total price (greater than zero)
            msg: 'Total price must be greater than zero.'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'TransactionProduct'
    }
  )

  return TransactionProduct
}
