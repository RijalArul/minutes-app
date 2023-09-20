const bcrypt = require('bcryptjs')

const saltRounds = 10

async function hashPassword (password) {
  return await bcrypt.hash(password, saltRounds)
}

async function comparePassword (password, userPassword) {
  return await bcrypt.compare(password, userPassword)
}

module.exports = {
  hashPassword,
  comparePassword
}
