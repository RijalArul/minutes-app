const jwt = require('jsonwebtoken')

function generateToken (payload) {
  const signToken = jwt.sign(payload, process.env.JWT_SECRET_KEY)
  return signToken
}

module.exports = {
  generateToken
}
