const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookSchema = new Schema({
  cover: {
    type: String,
    trim: true,
     required: true
  },
  name: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  author: {
    type: String
  },
  brief: {
    type: String
  },

    reviews : [{
    user: {type: Schema.Types.ObjectId, ref: "User"},
    rating: { type: Number },
    body: String,
    date: Date
  }]
})

mongoose.model('book', bookSchema);
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;