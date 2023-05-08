const mongoose = require('mongoose')

const Schema = mongoose.Schema

const authorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  icon: {
    type: String,
    default: null
  },
  books:[{
    type: Schema.Types.ObjectId
  }]
})

mongoose.model('Authors', authorSchema);
const Authors = mongoose.model('Authors', authorSchema);

module.exports = Authors;