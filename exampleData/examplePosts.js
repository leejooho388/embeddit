const Post = require('./../db/models/Posts');

const  examplePosts = [
    {
      authorName: 'dlai',
      subredditName: 'videos',
      title: 'YouTube has officially changed the URL of Rick Atley\'s "Never Gonna Give You Up" to include "gIveyouUP"',
      voteCount: 713,
      type: 'url',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      voteHistoryUser: {},
      // commentCount: 0
    },

    {
      authorName: 'jlee',
      subredditName: 'todayilearned',
      title: 'Chrome now automatically cleans up messy URLs when you share them',
      voteCount: 1400,
      type: 'url',
      url: 'https://www.androidpolice.com/2018/02/19/chrome-now-automatically-cleans-messy-urls-share/',
      voteHistoryUser: {},
      // commentCount: 0
    },
    
    {
      authorName: 'zgallagher',
      subredditName: 'pics',
      title: 'Stairway to Metropolis',
      voteCount: 213,
      type:'image',
      media: '/Users/Yadleo/Coding/embeddit/images/stairway_to_metropolis.jpg',
      voteHistoryUser: {},
      // commentCount: 0
    },
    
    {
      authorName: 'nsanchez',
      subredditName: 'videos',
      title: 'Everytime the staff at Conan does something fireable',
      voteCount: 155,
      type: 'video',
      media: 'https://www.youtube.com/watch?v=c0kjVF9vYEk',
      voteHistoryUser: {},
      // commentCount: 0
    },
    
    {
      authorName: 'nsanchez',
      subredditName: 'funny',
      title: 'Why does Africa never win the Olympics?',
      voteCount: 75,
      type: 'text',
      text: 'Because it\'s a continent, dumbass.',
      voteHistoryUser: {},
      // commentCount: 0
    },
    
    {
      authorName: 'dlai',
      subredditName: 'funny',
      title: 'Guy : Doctor, my Girlfriend is pregnant but we always use protection and the rubber never broke. How is it possible?',
      voteCount: 3000,
      type: 'text',
      text: 'Doctor : Let me tell you a story: "There was once a Hunter who always carried a gun wherever he went. One day he took out his Umbrella instead of his Gun and went out. A Lion suddenly jumped infront of him. In order to scare the Lion, the Hunter used the Umbrella like a Gun, and shot the Lion, then it died! \n Guy : Nonsense! Someone else must have shot the Lion.. \n Doctor : Good! You understood the story. Next patient please..',
      voteHistoryUser: {},
      // commentCount: 0
    },

    {
      authorName: "Toby_Ledner18",
      subredditName: "gaming",
      title: "Aperiam voluptatem ipsam voluptates aperiam id non asperiores.",
      type: "url",
      media: "http://lorempixel.com/640/480",
      text: "Praesentium modi porro itaque maxime aut non quo. Beatae consequatur velit id doloremque. Aut ut id amet magni sunt consequatur.",
      url: "https://hershel.org",
      voteCount: 88
    },

    {
      authorName: "Foster.OKon81",
      media: "http://lorempixel.com/640/480",
      subredditName: "jevon",
      text: "Odit ratione hic quaerat aut quia eius quas maxime. Quos exercitationem debitis veniam. Sed quia voluptas magnam fuga. Rerum ut non sed dicta.",
      title:"Impedit non sed quas itaque.",
      type: "url",
      url: "http://mallie.com",
      voteCount: 157
    },
    {
      authorName: 'dlai',
      subredditName: 'videos',
      title: 'YouTube has officially changed the URL of Rick Atley\'s "Never Gonna Give You Up" to include "gIveyouUP"',
      voteCount: 222,
      type: 'url',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      voteHistoryUser: {},
      // commentCount: 0
    },

    {
      authorName: 'jlee',
      subredditName: 'todayilearned',
      title: 'Chrome now automatically cleans up messy URLs when you share them',
      voteCount: 138,
      type: 'url',
      url: 'https://www.androidpolice.com/2018/02/19/chrome-now-automatically-cleans-messy-urls-share/',
      voteHistoryUser: {},
      // commentCount: 0
    },
    
    {
      authorName: 'zgallagher',
      subredditName: 'pics',
      title: 'Stairway to Metropolis',
      voteCount: 399,
      type:'image',
      media: '/Users/Yadleo/Coding/embeddit/images/stairway_to_metropolis.jpg',
      voteHistoryUser: {},
      // commentCount: 0
    },
    
    {
      authorName: 'nsanchez',
      subredditName: 'videos',
      title: 'Everytime the staff at Conan does something fireable',
      voteCount: 11,
      type: 'video',
      media: 'https://www.youtube.com/watch?v=c0kjVF9vYEk',
      voteHistoryUser: {},
      // commentCount: 0
    },
    
    {
      authorName: 'nsanchez',
      subredditName: 'funny',
      title: 'Why does Africa never win the Olympics?',
      voteCount: 88,
      type: 'text',
      text: 'Because it\'s a continent, dumbass.',
      voteHistoryUser: {},
      // commentCount: 0
    },
    
    {
      authorName: 'dlai',
      subredditName: 'funny',
      title: 'Guy : Doctor, my Girlfriend is pregnant but we always use protection and the rubber never broke. How is it possible?',
      voteCount: 7,
      type: 'text',
      text: 'Doctor : Let me tell you a story: "There was once a Hunter who always carried a gun wherever he went. One day he took out his Umbrella instead of his Gun and went out. A Lion suddenly jumped infront of him. In order to scare the Lion, the Hunter used the Umbrella like a Gun, and shot the Lion, then it died! \n Guy : Nonsense! Someone else must have shot the Lion.. \n Doctor : Good! You understood the story. Next patient please..',
      voteHistoryUser: {},
      // commentCount: 0
    },

    {
      authorName: "Toby_Ledner18",
      subredditName: "gaming",
      title: "Aperiam voluptatem ipsam voluptates aperiam id non asperiores.",
      type: "url",
      media: "http://lorempixel.com/640/480",
      text: "Praesentium modi porro itaque maxime aut non quo. Beatae consequatur velit id doloremque. Aut ut id amet magni sunt consequatur.",
      url: "https://hershel.org",
      voteCount: 11
    },

    {
      authorName: "Foster.OKon81",
      media: "http://lorempixel.com/640/480",
      subredditName: "jevon",
      text: "Odit ratione hic quaerat aut quia eius quas maxime. Quos exercitationem debitis veniam. Sed quia voluptas magnam fuga. Rerum ut non sed dicta.",
      title:"Impedit non sed quas itaque.",
      type: "url",
      url: "http://mallie.com",
      voteCount: 32
    },

    {
      authorName: 'dlai',
      subredditName: 'videos',
      title: 'YouTube has officially changed the URL of Rick Atley\'s "Never Gonna Give You Up" to include "gIveyouUP"',
      voteCount: 101,
      type: 'url',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      voteHistoryUser: {},
      // commentCount: 0
    },

    {
      authorName: 'jlee',
      subredditName: 'todayilearned',
      title: 'Chrome now automatically cleans up messy URLs when you share them',
      voteCount: 13,
      type: 'url',
      url: 'https://www.androidpolice.com/2018/02/19/chrome-now-automatically-cleans-messy-urls-share/',
      voteHistoryUser: {},
      // commentCount: 0
    },
    
    {
      authorName: 'zgallagher',
      subredditName: 'pics',
      title: 'Stairway to Metropolis',
      voteCount: 200,
      type:'image',
      media: '/Users/Yadleo/Coding/embeddit/images/stairway_to_metropolis.jpg',
      voteHistoryUser: {},
      // commentCount: 0
    },
    
    {
      authorName: 'nsanchez',
      subredditName: 'videos',
      title: 'Everytime the staff at Conan does something fireable',
      voteCount: 543,
      type: 'video',
      media: 'https://www.youtube.com/watch?v=c0kjVF9vYEk',
      voteHistoryUser: {},
      // commentCount: 0
    },
    
    {
      authorName: 'nsanchez',
      subredditName: 'funny',
      title: 'Why does Africa never win the Olympics?',
      voteCount: 0,
      type: 'text',
      text: 'Because it\'s a continent, dumbass.',
      voteHistoryUser: {},
      // commentCount: 0
    },
    
    {
      authorName: 'dlai',
      subredditName: 'funny',
      title: 'Guy : Doctor, my Girlfriend is pregnant but we always use protection and the rubber never broke. How is it possible?',
      voteCount: 0,
      type: 'text',
      text: 'Doctor : Let me tell you a story: "There was once a Hunter who always carried a gun wherever he went. One day he took out his Umbrella instead of his Gun and went out. A Lion suddenly jumped infront of him. In order to scare the Lion, the Hunter used the Umbrella like a Gun, and shot the Lion, then it died! \n Guy : Nonsense! Someone else must have shot the Lion.. \n Doctor : Good! You understood the story. Next patient please..',
      voteHistoryUser: {},
      // commentCount: 0
    },

    {
      authorName: "Toby_Ledner18",
      subredditName: "gaming",
      title: "Aperiam voluptatem ipsam voluptates aperiam id non asperiores.",
      type: "url",
      media: "http://lorempixel.com/640/480",
      text: "Praesentium modi porro itaque maxime aut non quo. Beatae consequatur velit id doloremque. Aut ut id amet magni sunt consequatur.",
      url: "https://hershel.org",
      voteCount: 0
    },

    {
      authorName: "Foster.OKon81",
      media: "http://lorempixel.com/640/480",
      subredditName: "worldnews",
      text: "Odit ratione hic quaerat aut quia eius quas maxime. Quos exercitationem debitis veniam. Sed quia voluptas magnam fuga. Rerum ut non sed dicta.",
      title:"Impedit non sed quas itaque.",
      type: "url",
      url: "http://mallie.com",
      voteCount: 0
    },
    {
      authorName: 'dlai',
      subredditName: 'videos',
      title: 'YouTube has officially changed the URL of Rick Atley\'s "Never Gonna Give You Up" to include "gIveyouUP"',
      voteCount: 0,
      type: 'url',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      voteHistoryUser: {},
      // commentCount: 0
    },

    {
      authorName: 'jlee',
      subredditName: 'todayilearned',
      title: 'Chrome now automatically cleans up messy URLs when you share them',
      voteCount: 13,
      type: 'url',
      url: 'https://www.androidpolice.com/2018/02/19/chrome-now-automatically-cleans-messy-urls-share/',
      voteHistoryUser: {},
      // commentCount: 0
    },
    
    {
      authorName: 'zgallagher',
      subredditName: 'pics',
      title: 'Stairway to Metropolis',
      voteCount: 0,
      type:'image',
      media: '/Users/Yadleo/Coding/embeddit/images/stairway_to_metropolis.jpg',
      voteHistoryUser: {},
      // commentCount: 0
    },
    
    {
      authorName: 'nsanchez',
      subredditName: 'videos',
      title: 'Everytime the staff at Conan does something fireable',
      voteCount: 0,
      type: 'video',
      media: 'https://www.youtube.com/watch?v=c0kjVF9vYEk',
      voteHistoryUser: {},
      // commentCount: 0
    },
    
    {
      authorName: 'nsanchez',
      subredditName: 'funny',
      title: 'Why does Africa never win the Olympics?',
      voteCount: 0,
      type: 'text',
      text: 'Because it\'s a continent, dumbass.',
      voteHistoryUser: {},
      // commentCount: 0
    },
    
    {
      authorName: 'dlai',
      subredditName: 'funny',
      title: 'Guy : Doctor, my Girlfriend is pregnant but we always use protection and the rubber never broke. How is it possible?',
      voteCount: 0,
      type: 'text',
      text: 'Doctor : Let me tell you a story: "There was once a Hunter who always carried a gun wherever he went. One day he took out his Umbrella instead of his Gun and went out. A Lion suddenly jumped infront of him. In order to scare the Lion, the Hunter used the Umbrella like a Gun, and shot the Lion, then it died! \n Guy : Nonsense! Someone else must have shot the Lion.. \n Doctor : Good! You understood the story. Next patient please..',
      voteHistoryUser: {},
      // commentCount: 0
    },

    {
      authorName: "Toby_Ledner18",
      subredditName: "gaming",
      title: "Aperiam voluptatem ipsam voluptates aperiam id non asperiores.",
      type: "url",
      media: "http://lorempixel.com/640/480",
      text: "Praesentium modi porro itaque maxime aut non quo. Beatae consequatur velit id doloremque. Aut ut id amet magni sunt consequatur.",
      url: "https://hershel.org",
      voteCount: 0
    },

    {
      authorName: "Foster.OKon81",
      media: "http://lorempixel.com/640/480",
      subredditName: "worldnews",
      text: "Odit ratione hic quaerat aut quia eius quas maxime. Quos exercitationem debitis veniam. Sed quia voluptas magnam fuga. Rerum ut non sed dicta.",
      title:"Impedit non sed quas itaque.",
      type: "url",
      url: "http://mallie.com",
      voteCount: 0
    }
  ];

(function() {
  Post.create(examplePosts)
})();