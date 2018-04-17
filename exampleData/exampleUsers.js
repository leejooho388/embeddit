const Users = require('./../db/models/Users');

const exampleUsers = [
  {
    username: 'zgallagher',
    password: 'asdf',
    postKarma: 888,
    commentKarma: 11217,
    subredditIds:['askreddit', 'worldnews', 'videos', 'funny', 'todayilearned', 'pics', 'gaming']
  },

  {
    username: 'jlee',
    password: 'asdfk',
    postKarma: 1111,
    commentKarma: 12848,
    subredditIds:['askreddit', 'worldnews', 'videos', 'funny', 'todayilearned', 'pics', 'gaming']
  },
  
  {
    username: 'dlai',
    password: 'asdfl',
    postKarma: 20947,
    commentKarma: 1757,
    subredditIds:['askreddit', 'worldnews', 'videos', 'funny', 'todayilearned', 'pics', 'gaming']
  },
  
  {
    username: 'nsanchez',
    password: 'asdf',
    postKarma: 767,
    commentKarma: 14878,
    subredditIds:['askreddit', 'worldnews', 'videos', 'funny', 'todayilearned', 'pics', 'gaming']
  }
  
];

(function() {
  Users.create(exampleUsers)
})();