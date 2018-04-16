const Post = require('../models/Posts.js');
const User = require('../models/Users.js');

const voteController = {
  post: (req, res) => {

    // req.body { postId: '5ad26cf9665cb8a24aa5770a',
    //   userId: '5ad0387dc939da247cf9ed7b',
    //   vote: 1 }

    Post.findOne({ _id: req.body.postId })
      .exec()
      .then(post => {
        let newVoteHistory = post.voteHistoryUser || {};
        newVoteHistory[req.body.userId] = req.body.vote;

        Post.findByIdAndUpdate(req.body.postId,
          { $set: { voteHistoryUser: newVoteHistory },
            $inc: { voteCount: req.body.vote } }).exec()
          .catch(err => {
            console.log('Error incrementing vote count.', err);
          });

        User.findOneAndUpdate({ username: post.authorName }, { $inc: { 'postKarma': req.body.vote } }).exec()
          .catch(err => {
            console.log('Error updating user karma.', err);
          });
      })
      .catch(err => {
        console.log('Error updating vote history.', err);
      });

    res.status(200).end();
  },

  put: (req, res) => {

    // req.body { postId: '5ad26cf9665cb8a24aa5770a',
    //   userId: '5ad0387dc939da247cf9ed7b' }




    res.status(200).end();
  }
}

module.exports = voteController;