const mongoose = require('mongoose');
const db = require('./index');

// Make sub schemas for postId and commentId
var postId = mongoose.Schema();

var commentId = mongoose.Schema({
  commentId: String,
  vote: Boolean // True if upvote, false if downvote
});

var userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true},
  postKarma: Number,
  commentKarma: Number,
  subredditIds: [{ type: String }],
  voteHistoryPost: {},
  voteHistoryComment: {}
});

// voteHistoryPost
// { key: postId
//   value: Boolean // True if upvote, false if downvote
// }

// voteCommentPost
// { key: commentId
//   value: Boolean // True if upvote, false if downvote
// }

var User = db.model('User', userSchema);

module.exports = User;