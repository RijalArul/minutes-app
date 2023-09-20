const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { User } = require('../models')

class UserController {
  static async register (req, res, next) {
    try {
      const { email, password } = req.body

      const newUser = await User.create({
        email,
        password
      })

      res.status(201).json(newUser)
    } catch (err) {
      next(err)
    }
  }
  static async login (req, res, next) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({
        where: {
          email: email
        }
      })

      const validPass = await comparePassword(password, user.password)

      if (validPass) {
        const payloadUser = {
          id: user.id,
          email: user.email
        }
        const signToken = generateToken(payloadUser)
        res.status(200).json({
          user: user,
          jwt: signToken
        })
      } else {
        throw new Error('Invalid_Password')
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController
