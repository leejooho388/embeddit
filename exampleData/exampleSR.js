const Subreddits = require('./../db/models/Subreddits');

const exampleSR = [
  {
    name: 'askreddit',
    subscriberCount: 45213,
    description: 'Ask a question'
  },

  {
    name: 'worldnews',
    subscriberCount: 31435,
    description: '/r/worldnews is for major news from around the world except US-internal news / US politic'
  },

  {
    name: 'videos',
    subscriberCount: 42867,
    description: 'A great place for video content of all kinds. Direct links to major video sites are preferred (e.g. YouTube, Vimeo, etc.)'
  },

  {
    name: 'funny',
    subscriberCount: 43985,
    description: 'You may only post if you are funny.'
  },

  {
    name: 'todayilearned',
    subscriberCount: 39875,
    description: 'You learn something new every day; what did you learn today? Submit interesting and specific facts that you just found out (not broad information you looked up, TodayILearned is not /r/wikipedia).'
  },

  {
    name: 'pics',
    subscriberCount: 40737,
    description:'A place to share photographs and pictures. Feel free to post your own, but please read the rules first (see below), and note that we are not a catch-all for general images (of screenshots, comics, etc.)'
  },
  {
    name: 'gaming',
    subscriberCount: 12431,
    description:'Submissions must be directly gaming-related.'
  }
];

(function() {
  Subreddits.create(exampleSR)
})();