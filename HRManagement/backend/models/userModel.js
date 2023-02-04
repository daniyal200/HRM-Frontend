const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    userID: {
      type: String,
      required: [true, 'Please add an userID'],
      
    }
  }  
)

module.exports = mongoose.model('User', userSchema)