const bcrypt = require('bcrypt')

const saltRounds = 10

function hash(password) {
  return bcrypt.hash(password, saltRounds)
}

function compare(password, hash) {
  return bcrypt.compare(password, hash)
}

module.exports = {
  hash,
  compare
}