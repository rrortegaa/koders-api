require('dotenv').config()
const server = require('./src/server')
const db = require('./src/lib/db')

db.connect()
  .then(() => {
    console.log('DB connected')
    server.listen(8080, () => {
      console.log('Server is listening')
    })
  })
  .catch((error) => {
    console.error('DB CONNECTION ERROR:', error)
  })
