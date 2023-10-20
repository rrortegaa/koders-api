const express = require('express')

const kodersRouter = require('./routers/koders.router')

const authRouter = require('./routers/auth.router')

const app = express()

app.use(express.json()) // Middleware: Importar antes de mis rutas
app.use(express.urlencoded({ extended: true }))

app.use('/koders', kodersRouter)
app.use('/auth', authRouter)

app.get("/", (request, response) => {
  //response.status(200).send({ message: "Hola" })

  response.json({
    message: "API koders v1"
  })
})

module.exports = app