const Users = require('./../db/models/Users');
const bcrypt = require('bcrypt-nodejs');

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const asdfHash = bcrypt.hashSync('asdf', salt);

const exampleUsers = [
  {
    username: 'zgallagher',
    password: asdfHash,
    postKarma: 888,
    commentKarma: 11217,
    subredditIds:['askreddit', 'worldnews', 'videos', 'funny', 'todayilearned', 'pics', 'gaming']
  },

  {
    username: 'jlee',
    password: asdfHash,
    postKarma: 1111,
    commentKarma: 12848,
    subredditIds:['askreddit', 'worldnews', 'videos', 'funny', 'todayilearned', 'pics', 'gaming']
  },
  
  {
    username: 'dlai',
    password: asdfHash,
    postKarma: 20947,
    commentKarma: 1757,
    subredditIds:['askreddit', 'worldnews', 'videos', 'funny', 'todayilearned', 'pics', 'gaming']
  },
  
  {
    username: 'nsanchez',
    password: asdfHash,
    postKarma: 767,
    commentKarma: 14878,
    subredditIds:['askreddit', 'worldnews', 'videos', 'funny', 'todayilearned', 'pics', 'gaming']
  }
  
];

(function() {
  Users.create(exampleUsers)
})();