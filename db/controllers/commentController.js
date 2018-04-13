const comment = require('../models/Comments');

commentController = {
  get: (req, res) => {
    comment.find(req.body, function(err, comments){
      if(err){
        return res.send('no comments')
      }
      res.send(comments);
    })
  },

  post: (req, res) => {
    new comment(req.body).save().exec(function(err){
      if(err) {
        return res.send(err);
      }
      res.send('success');
    })
  }
}

module.exports = commentController;