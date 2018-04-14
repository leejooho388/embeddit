const Users = require('../models/Users');
const bcrypt = require('bcrypt-nodejs');

const passport = require('passport');

const checkValidPassword = async (password, user, cb) => {
  bcrypt.compare(password, user.password)
    .then(match => {
      cb(match);
    });
};

const loginUser = (username, password, done) => {
  Users.findOne({username: username})
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      checkValidPassword(password, user, match => {
        if (!match) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      });
    })
    .catch(err => done(err));
};

module.exports = loginUser;