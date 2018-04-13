const mongoose = require('mongoose');
const db = require('../index');

var commentSchema = mongoose.Schema({
    parentType: Number, // post = 0, comment = 1
    parentId: { type: String, required: true },
    text: String,
    voteCount: Number,
    author: {
      authorId: String,
      name: String
    }
  },
  {
    timestamps: true
  }
);

var Comment = db.model('Comment', commentSchema);

module.exports = Comment;