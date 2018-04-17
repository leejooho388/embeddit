const Comment = require('../models/Comments.js');
const User = require('../models/Users.js');

const updateDbWithVote = (commentId, userId, vote, isNewVote) => {
  Comment.findOne({ _id: commentId })
    .exec()
    .then(comment => {
      let newVoteHistory = comment.voteHistoryUser || {};
      if (isNewVote) {
        newVoteHistory[userId] = vote;
      } else {
        delete newVoteHistory[userId];
      }

      Comment.findByIdAndUpdate(commentId,
        { $set: { voteHistoryUser: newVoteHistory },
          $inc: { voteCount: vote } }).exec()
        .catch(err => {
          console.log('Error incrementing comment vote count.', err);
        });

      User.findOneAndUpdate({ _id: comment.author.authorId }, { $inc: { 'commentKarma': vote } }).exec()
        .catch(err => {
          console.log('Error updating user comment karma.', err);
        });
    })
    .catch(err => {
      console.log('Error updating comment vote history.', err);
    });
};

const commentVoteController = {
  post: (req, res) => {
    updateDbWithVote(req.body.commentId, req.body.userId, req.body.vote, true);
    res.status(200).end();
  },

  put: (req, res) => {
    updateDbWithVote(req.body.commentId, req.body.userId, req.body.vote, false);
    res.status(200).end();
  }
};

module.exports = commentVoteController;