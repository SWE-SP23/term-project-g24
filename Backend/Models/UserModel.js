const mongoose = require('mongoose'),
bcrypt = require('bcrypt')
const  Schema = mongoose.Schema;

/**
 * User Schema
 */
const UserSchema = new Schema({
  fullName: {
    type: String,
    trim: true,
     required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  hash_password: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  books:
  [
    { 
      type: Schema.Types.ObjectId,
      ref: 'Book'
      }
  ]
  ,
  picture:
  {//profile picture jpg
    type: String,
    trim: true,
    default: 'default.jpg'
    },
    bio:
    {
      type: String,
      trim: true,
     default: 'No bio'
    
    } 
  
})

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};

mongoose.model('User', UserSchema);