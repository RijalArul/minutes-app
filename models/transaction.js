'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Transaction.belongsTo(models.User, {
        foreignKey: 'user_id'
      })

      Transaction.belongsToMany(models.Product, {
        through: 'TransactionProduct',
        foreignKey: 'transaction_id'
      })
    }
  }
  Transaction.init(
    {
      user_id: DataTypes.INTEGER,
      transaction_date: DataTypes.DATE,
      amount: DataTypes.INTEGER,
      payment_method: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Transaction status is required.'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Transaction'
    }
  )
  return Transaction
}
