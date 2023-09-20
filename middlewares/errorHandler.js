function errorHandler (err, req, res, next) {
  console.log(err)
  let statusCode = 500
  let errorMessage = 'Internal Server Error'

  switch (err.name || err.message) {
    case 'SequelizeUniqueConstraintError':
      statusCode = 409
      errorMessage = 'Email is already taken'
      return res.status(statusCode).json({ error: errorMessage })
    case 'SequelizeValidationError':
      statusCode = 400
      return res.status(statusCode).json({ error: err.errors[0].message })
    case 'Invalid_Password':
      statusCode = 401
      errorMessage = 'Invalid Email/Password'
      return res.status(statusCode).json({ error: errorMessage })
    case 'Not_Found':
      statusCode = 404
      errorMessage = `${err.type} not found`
      return res.status(statusCode).json({ error: errorMessage })

    default:
      return res.status(statusCode).json({ error: errorMessage })
  }
}

module.exports = errorHandler
