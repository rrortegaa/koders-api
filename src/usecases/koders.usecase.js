const createError = require('http-errors')

const Koders = require('../models/koders.model')
const encrypt = require('../lib/encrypt')

async function getAll() {
  const koders = await Koders.find({})
  return koders
}

async function getById(id) {
  const koder = await Koders.findById(id)

  if(!koder) {
    throw createError(404, 'Koder id ${id} not found')
  }

  return koder
}

async function create(koderData) {
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  
  if(!koderData.password) {
    throw createError(400, 'Password is required')
  }

  if(!passwordRegex.test(koderData.password)) {
    throw createError(
      400,
      'Password must have at least 8 characters and contain upper, lower letters and numbers.'
    )
  }

  const passwordHashed = await encrypt.hash(koderData.password)
  koderData.password = passwordHashed

  const newKoder = await Koders.create(koderData)
  return newKoder
}

async function deleteById(id) {
  const koder = await Koders.findById(id)

  if(!koder) {
    throw createError(404, 'Koder id ${id} not found')
  }

  const koderDeleted = await Koders.findByIdAndDelete(id)
  return koderDeleted
}

async function updateById(id, data) {
  const updatedKoder = await Koders.findByIdAndUpdate(id, data, { new: true })
  return updatedKoder
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateById
}