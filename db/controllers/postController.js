const Post = require('../models/Posts.js');
const User = require('../models/Users.js');
const db = require('mongoose');

const postController = {
  get: (req, res) => {

    console.log('req.params', req.params)

    if (req.params.userId !== 'undefined') {
      User.findById(req.params.userId)
        .then(user => {
          Post
            .find()
            .where('subredditName').in(user.subredditIds)
            .sort({ createdAt: -1})
            .limit(25)
            .then( data => {
              res.status(200).send(data);
            })
            .catch( err => {
              res.status(404).send(err)
            })

        })
        .catch(err => {
          console.log('Error finding user in database getting posts.')
        })
    } else {
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
    }
  },

  getSubreddit: (req, res) => {
    Post
      .find({ subredditName: req.params.subreddit })
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
      .findById(req.params.postId)
      .then( post => {
        res.status(200).send(post);
      })
      .catch( err => {
        res.status(404).send(err);
      })
  }

};

module.exports = postController;
