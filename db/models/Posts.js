const mongoose = require('mongoose');
const db = require('../index');

var postSchema = mongoose.Schema({
  authorId: { type: String, required: true },
  subredditId: { type: String, required: true },
  voteCount: Number,
  type: String, // 'url', 'media', or 'text'
  url: String,
  media: String,
  text: String,
  voteHistoryUser: {},
  },
  {
    timestamps: true
  }
);

// voteHistoryUser
// { key: UserId
//   value: Boolean // True if upvote, false if downvote
// }

var Post = db.model('Post', postSchema);

module.exports = Post;