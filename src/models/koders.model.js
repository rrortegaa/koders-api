const mongoose = require('mongoose')
const kodersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLenght: 2,
    maxLenght: 30
  },
  lastName: {
    type: String,
    required: true,
    minLenght: 2,
    maxLenght: 30
  },
  email: {
    type: String,
    required: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
},
{timestamps: true}
)

module.exports = mongoose.model('koders', kodersSchema)