const createError = require('http-errors')

const jwt = require('../lib/jwt')

function auth(request, response, next) {
  try {
    const { authorization } = request.headers

    if (!authorization) throw createError(400, 'Token is required')

    const token = authorization.replace("Bearer ", "")
    const payload = jwt.verify(token)

    next()
  } catch (error) {
    response.status(401).json({
      success: false,
      message: error.message || 'Unknow, something went wrong'
    })
  }
}

module.exports = auth