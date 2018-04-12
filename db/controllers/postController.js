const post = require('../models/Posts.js');

const newPost = function(req, res) {
  console.log('in the new post body section', req.body);
  new post(req.body).save(function(err) {
    err ? res.status(404).send() : res.status(201).send()
  });
}

module.exports.newPost = newPost;