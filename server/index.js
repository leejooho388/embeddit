require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const routes = require('./routes/router');
const loginUser = require('../db/controllers/loginUser');

const PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(session(
  { secret: 'team_backbone',
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 7 days
    resave: false,
    saveUninitialized: true
  }));
app.use(passport.initialize());
// app.use(passport.session());

passport.use(new LocalStrategy({ session: false }, loginUser));

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

