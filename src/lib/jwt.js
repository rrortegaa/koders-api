const jsonwebtoken = require('jsonwebtoken')

const { JWT_SECRET_KEY } = process.env

function sign(payload) {
  return jsonwebtoken.sign(payload, JWT_SECRET_KEY, { expiresIn: '1d' })
}

function verify(token) {
  return jsonwebtoken.verify(token, JWT_SECRET_KEY)
}

module.exports = {
  sign,
  verify
}