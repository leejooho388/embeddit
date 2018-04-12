const mongoose = require('mongoose');
const db = require('../index');

// Make sub schemas for postId and commentId
var postId = mongoose.Schema();

var commentId = mongoose.Schema({
  commentId: String,
  vote: Boolean // True if upvote, false if downvote
});

var userSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true},
  postKarma: { type: Number, default: 0 },
  commentKarma: { type: Number, default: 0 },
  subredditIds: [{ type: String }]
});

// voteHistoryComment: {}

// voteCommentPost
// { key: commentId
//   value: Boolean // True if upvote, false if downvote
// }


var User = db.model('User', userSchema);

User.createUser = (user) => {

};

User.checkLogin = (user) => {

};

module.exports = User;