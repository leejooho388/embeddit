const Post = require('../models/Posts.js');
const User = require('../models/Users.js');

const updateDbWithVote = (postId, userId, vote, isNewVote) => {
  Post.findOne({ _id: postId })
    .exec()
    .then(post => {
      let newVoteHistory = post.voteHistoryUser || {};
      if (isNewVote) {
        newVoteHistory[userId] = vote;
      } else {
        delete newVoteHistory[userId];
      }

      Post.findByIdAndUpdate(postId,
        { $set: { voteHistoryUser: newVoteHistory },
          $inc: { voteCount: vote } }).exec()
        .catch(err => {
          console.log('Error incrementing post vote count.', err);
        });

      User.findOneAndUpdate({ username: post.authorName }, { $inc: { 'postKarma': vote } }).exec()
        .catch(err => {
          console.log('Error updating user post karma.', err);
        });
    })
    .catch(err => {
      console.log('Error updating post vote history.', err);
    });
};

const postVoteController = {
  post: (req, res) => {
    updateDbWithVote(req.body.postId, req.body.userId, req.body.vote, true);
    res.status(200).end();
  },

  put: (req, res) => {
    updateDbWithVote(req.body.postId, req.body.userId, req.body.vote, false);
    res.status(200).end();
  }
};

module.exports = postVoteController;