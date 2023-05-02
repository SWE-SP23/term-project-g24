const mongoose = require('mongoose')

const Schema = mongoose.Schema

bcrypt = require('bcrypt')


/**
 * User Schema
 */
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
    type: Date,
    default: Date.now
  },

    reviews : [{
    user: {type: Schema.Types.ObjectId, ref: "User"},
    rating: { type: Number },
    body: String,
    date: Date
  }]
})

const bookModel = mongoose.model('Book', bookSchema);
module.exports = bookModel;