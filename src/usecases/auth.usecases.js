const createError = require('http-errors')
const encrypt = require('../lib/encrypt')
const jwt = require('../lib/jwt')
const Koder = require('../models/koders.model')

async function login(email, password) {
  const koderFound = await Koder.findOne({ email })

  if (!koderFound) {
    throw createError(401, 'Invalid data')
  }

  const isValidPassword = await encrypt.compare(password, koderFound.password)
  
  if (!isValidPassword) {
    throw createError(401, 'Invalid data')
  }

  return jwt.sign({ id: koderFound._id })
}

module.exports = {
  login
}