// INSTRUCTIONS
/*
  Create a new resource model that uses the User
  as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  Your model must contain at least three attributes
  other than the associated user and the timestamps.

  Your model must have at least one helpful virtual
  or query function. For example, you could have a
  book's details output in an easy format: book.format()
*/
const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String, 
    required: true 
  },
  gender: {
    type: String, 
    enum: ['MALE', 'FEMALE'],
    default: 'MALE'
  },
  dateOfBirth: {
    type: Date,
    required: false
  }
},{
  timestamps: true,
  toJSON: {
    getters: true
  }
});




// export our mongoose model
module.exports = mongoose.model('Artist', ArtistSchema);