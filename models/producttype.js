const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ProductType extends Model {
    static associate (models) {
      ProductType.hasMany(models.Product, {
        foreignKey: 'product_type_id'
      })
    }
  }

  ProductType.init(
    {
      type_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Type name is required.'
          }
        }
      },
      description: DataTypes.TEXT,
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Status is required.'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'ProductType'
    }
  )

  return ProductType
}
