const express = require('express');
const post = require('../models/Posts.js');

const postController = {
  get: (req, res) => {
    post
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
    new post(req.body).save()
      .then( response => {
        res.status(201).send()
      })
      .catch( err => {
        res.status(404).send(err)
      })
  }

}

module.exports = postController;
