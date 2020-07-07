const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String, 
    required: true 
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'Artist'
  },
  dateOfPublished: {
    type: Date,
    required: true,
  }
},{
  timestamps: true
});

// export our mongoose model
module.exports = mongoose.model('Song', SongSchema);