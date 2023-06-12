const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  imageUrls: {
    type: [String],
    required: false
  },
  text: {
    type: String,
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});


module.exports = mongoose.model('Post', postSchema);
