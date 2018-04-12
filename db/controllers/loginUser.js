const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const { createSession } = require('../../client/utils/sessionHelper');

const loginUser = (req, res) => {
  Users.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      res.status(401).send(err.message);
    } else {

      if (user) {
        bcrypt.compare(req.body.pw, user.password)
          .then(match => {
            if (match) {
              createSession(req, res, user);
            } else {
              res.status(401).send('Incorrect password');
            }
          })
          .catch(err => {
            res.status(401).send(err.message);
          });
      } else {
        res.status(401).send('User does not exist')
      }

    };
  });
};

module.exports = loginUser;