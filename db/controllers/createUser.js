const Users = require('../models/Users');
const bcrypt = require('bcrypt-nodejs');

const saltRounds = 10;

module.exports = (req, res, cb) => {

  Users.findOne({ username: req.body.username }, (err, user) => {
    if (user) {
      res.status(409).send('Username already exists');
    } else {
      bcrypt.hash(req.body.password, saltRounds)
        .then(hash => {

          // Look up default subreddit id's (should be seeded to db)
          // Add to User in future commit

          // defaultSRs: askreddit, worldnews, videos, funny, todayilearned, pics

          Users.create({
              username: req.body.username,
              password: hash,
            }, (err, newUser) => {
            if (err) {
              res.status(500).send(err.message);
            } else {
              cb(newUser);
            }
          });
      });
    }
  });
};

