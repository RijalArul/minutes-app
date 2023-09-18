'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Supplier.hasMany(models.Product, {
        foreignKey: 'supplier_id'
      })
    }
  }
  Supplier.init(
    {
      supplier_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Supplier name is required.'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Supplier'
    }
  )
  return Supplier
}
