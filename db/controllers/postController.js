const Post = require('../models/Posts.js');

const postController = {
  get: (req, res) => {
    Post
      .find()
      .sort({ createdAt: -1})
      .limit(25)
      .then( data => {
        res.status(200).send(data);
      })
      .catch( err => {
        res.status(404).send(err)
      })
  },

  newPost: (req, res) => {
    new Post(req.body).save()
      .then( response => {
        res.status(201).send()
      })
      .catch( err => {
        res.status(404).send(err)
      })
  },

  getNewestByUser: (req, res) => {
    post
      .find()
      .sort({ createdAt: -1})
      .limit(1)
      .then( data => {
        res.status(200).send(data);
      })
      .catch( err => {
        res.status(404).send(err)
      })
  },

  getPostById: (req, res) => {;
    post
      .find({_id: req.body.id})
      .then( data => {
        res.status(200).send(data);
      })
      .catch( err => {
        res.status(404).send(err);
      })
  }

}

module.exports = postController;
