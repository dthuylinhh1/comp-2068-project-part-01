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
    required: true
  }
},{
  timestamps: true,
  toJSON: {
    getters: true
  }
});


// export our mongoose model
module.exports = mongoose.model('Artist', ArtistSchema);