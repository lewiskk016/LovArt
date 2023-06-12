const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true
});


module.exports = mongoose.model('Post', postSchema);
