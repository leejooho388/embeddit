const Post = require('../models/Posts.js');

const voteController = {
  post: (req, res) => {

    // req.body { postId: '5ad26cf9665cb8a24aa5770a',
    //   userId: '5ad0387dc939da247cf9ed7b',
    //   vote: 1 }



    res.status(200).end();
  },

  put: (req, res) => {

    // req.body { postId: '5ad26cf9665cb8a24aa5770a',
    //   userId: '5ad0387dc939da247cf9ed7b' }



    res.status(200).end();
  }
}

module.exports = voteController;