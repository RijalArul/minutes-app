const { Model, Sequelize } = require('sequelize')
const { isEmail } = require('validator') // Import the validator library to check email format

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      User.hasMany(models.Transaction, {
        foreignKey: 'user_id'
      })
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Invalid email format.'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 14],
            msg: 'Password must be between 6 and 14 characters in length.'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'User'
    }
  )

  return User
}
