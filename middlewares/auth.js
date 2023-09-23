const jwt = require('jsonwebtoken')

function authentication (req, res, next) {
  try {
    const headers = req.headers.access_token
    const payload = jwt.verify(headers, process.env.JWT_SECRET_KEY)
    req.userData = payload
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = {
  authentication
}
