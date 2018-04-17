const Users = require('../models/Users');
const bcrypt = require('bcrypt-nodejs');

const saltRounds = 10;

module.exports = (req, res, cb) => {

  Users.findOne({ username: req.body.username }, (err, user) => {
    if (user) {
      res.status(409).send('Username already exists');
    } else {
      let salt = bcrypt.genSaltSync(saltRounds);
      bcrypt.hash(req.body.password, salt, null, (err, hash) => {

          const defaultSRs = ['askreddit', 'worldnews', 'videos', 'funny', 'todayilearned', 'pics', 'gaming'];

          Users.create({
              username: req.body.username,
              password: hash,
              subredditIds: defaultSRs
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

