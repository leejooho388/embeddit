const Post = require('../models/Posts.js');
const db = require('mongoose');

const postController = {
  get: (req, res) => {

    console.log(req.params);

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
    Post
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

  getPostById: (req, res) => {
    Post
      .find({_id: db.Types.ObjectId(req.params.postId)})
      .then( data => {
        console.log('DATA', data);
        res.status(200).send(data);
      })
      .catch( err => {
        res.status(404).send(err);
      })
  }

}

module.exports = postController;
