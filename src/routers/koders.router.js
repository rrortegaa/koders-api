const express = require('express')

const koders = require('../usecases/koders.usecase')

const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/', async (request, response) => {
  try {
    const allKoders = await koders.getAll()

    response.json({
      success: true,
      message: 'Complete list of koders',
      data: { koders: allKoders }
    })
  } catch (error) {
    response.status(error.status || 500)
    .json({
      success: false,
      message: error.message || 'Unknown, something went wrong'
    })
  }
})

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const koderFound = await koders.getById(id)

    response.json({
      success: true,
      message: 'Koder found',
      data: { koder: koderFound }
    })
  } catch (error) {
    response.status(error.status || 500)
    .json({
      success: false,
      message: error.message || 'Unknown, something went wrong'
    })
  }
})

router.post('/', async (request, response) => {
  try {
    const koderData = request.body
    const newKoder = await koders.create(koderData)

    response.json({
      success: true,
      message: 'Koder created',
      data: { koder: newKoder }
    })
  } catch (error) {
    response.status(error.status || 500)
    .json({
      success: false,
      message: error.message || 'Unknown, something went wrong'
    })
  }
})

router.delete('/:id', auth, async (request, response) => {
  try {
    const { id } = request.params
    const koderDeleted = await koders.deleteById(id)

    response.json({
      success: true,
      message: 'Koder deleted',
      data: { koder: koderDeleted }
    })
  } catch (error) {
    response.status(error.status || 500)
    .json({
      success: false,
      message: error.message || 'Unknown, something went wrong'
    })
  }
})

  router.patch('/:id', auth, async (request, response) => {
    try {
      const { id } = request.params
      const koderData = request.body
      const koderUpdated = await koders.updateById(id, koderData)

      response.json({
        success: true,
        message: 'Koder updated',
        data: { koder: koderUpdated }
      })
    } catch (error) {
      response.status(error.status || 500)
      .json({
        success: false,
        message: error.message || 'Unknown, something went wrong'
      })
    }
  })

module.exports = router