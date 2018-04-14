const comment = require("../models/Comments.js");

commentController = {
  get: (req, res) => {
    comment
      .find(req.body)
      .then(comments => {
        res.status(200).send(comments);
      })
      .catch(err => {
        res.status(404).send("no comments", err);
      });
  },

  post: (req, res) => {
    new comment(req.body)
      .save()
      .then(response => {
        res.status(201).send("success");
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
};

module.exports = commentController;
