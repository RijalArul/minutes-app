const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate (models) {
      Product.belongsTo(models.Brand, {
        foreignKey: 'brand_id'
      })

      Product.belongsTo(models.ProductType, {
        foreignKey: 'product_type_id'
      })

      Product.belongsTo(models.Supplier, {
        foreignKey: 'supplier_id'
      })

      Product.belongsToMany(models.Transaction, {
        through: 'TransactionProduct',
        foreignKey: 'product_id'
      })
    }
  }

  Product.init(
    {
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.TEXT,
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: {
            args: [0.01],
            msg: 'Price must be greater than zero.'
          }
        }
      },
      stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [-1],
            msg: 'Stock quantity cannot be less than -1.'
          }
        }
      },
      image: DataTypes.TEXT,
      product_type_id: DataTypes.INTEGER,
      brand_id: DataTypes.INTEGER,
      supplier_id: DataTypes.INTEGER,
      status: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Product'
    }
  )

  return Product
}
