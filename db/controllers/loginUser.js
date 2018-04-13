const Users = require('../models/Users');
const bcrypt = require('bcrypt');

const passport = require('passport');
const jwt = require('jsonwebtoken');

// old auth
// const { createSession } = require('../../client/utils/sessionHelper');

const validPassword = (password, user) => {
  return bcrypt.compare(password, user.password)
    .then(match => {
      return match;
    });
};

const loginUser = (username, password, done) => {
  Users.findOne({username: username})
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const match = validPassword(password, user);

      console.log('match', match);

      if (!validPassword(password, user)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      const token = jwt.sign(user, 'your_jwt_secret', { expiresIn: '7d' });
      console.log('3', token)
      return done(null, token);
    })
    .catch(err => done(err));
};

module.exports = loginUser;