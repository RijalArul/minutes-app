const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate (models) {
      Brand.hasMany(models.Product, {
        foreignKey: 'brand_id'
      })
    }
  }

  Brand.init(
    {
      brand_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 30],
            msg: 'Brand name must be between 10 and 30 characters in length.'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Brand'
    }
  )

  return Brand
}
