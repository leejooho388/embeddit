const mongoose = require('mongoose');
const db = require('../index');

var postSchema = mongoose.Schema({
  authorName: { type: String, required: true },
  subredditName: { type: String, required: true },
<<<<<<< HEAD
  title: String,
=======
>>>>>>> set up get request for posts and pushed in fake post data
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