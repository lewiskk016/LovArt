const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    },
    text: {
      type: String,
      required: true
    },
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  }, {
    timestamps: true
  });

module.exports = mongoose.model('Comment', commentSchema);



