const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    name: {
      type: String,
      required: '*required.'
    },
    description: {
      type: String,
      required: '*required.'
    },
    email: {
      type: String,
      required: '*required.'
    },
    category: {
        type: String,
        enum: ['Aero Club', 'Robotics Club', 'Coding Club', 'Dramatics', 'Literacy', 'Athletics', 'Football Club', 'Cricket Club', 'Chess Club', 'Kabaddi', 'Media House', 'Rotract', 'Green Club', 'Steering', 'Astrowing', 'Senior Mentor'],
        required: '*required.'
      },
    Requirement: {
      type: Array
    },
    image: {
      type: String
    },
  });
  
  postSchema.index({ name: 'text', description: 'text' });    ///indexing for search
  
  module.exports = mongoose.model('post', postSchema);