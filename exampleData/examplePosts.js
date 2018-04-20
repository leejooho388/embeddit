const Post = require('./../db/models/Posts');

const  examplePosts = [
    {
      authorName: 'dlai',
      subredditName: 'videos',
      title: 'YouTube has officially changed the URL of Rick Atley\'s "Never Gonna Give You Up" to include "gIveyouUP"',
      voteCount: 713,
      type: 'video',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },

    {
      authorName: 'jlee',
      subredditName: 'todayilearned',
      title: 'Chrome now automatically cleans up messy URLs when you share them',
      voteCount: 1400,
      type: 'url',
      url: 'https://www.androidpolice.com/2018/02/19/chrome-now-automatically-cleans-messy-urls-share/'
    },
    
    {
      authorName: 'zgallagher',
      subredditName: 'pics',
      title: 'Stairway to Metropolis',
      voteCount: 213,
      type:'image',
      url: 'https://putmelike.com/stairway-to-metropolis/'
    },
    
    {
      authorName: 'nsanchez',
      subredditName: 'videos',
      title: 'Everytime the staff at Conan does something fireable',
      voteCount: 155,
      type: 'video',
      url: 'https://www.youtube.com/watch?v=c0kjVF9vYEk'
    },
    
    {
      authorName: 'nsanchez',
      subredditName: 'funny',
      title: 'Why does Africa never win the Olympics?',
      voteCount: 75,
      type: 'text',
      text: 'Because it\'s a continent, dumbass.'
    },
    
    {
      authorName: 'dlai',
      subredditName: 'funny',
      title: 'Guy : Doctor, my Girlfriend is pregnant but we always use protection and the rubber never broke. How is it possible?',
      voteCount: 3000,
      type: 'text',
      text: 'Doctor : Let me tell you a story: "There was once a Hunter who always carried a gun wherever he went. One day he took out his Umbrella instead of his Gun and went out. A Lion suddenly jumped infront of him. In order to scare the Lion, the Hunter used the Umbrella like a Gun, and shot the Lion, then it died! \n Guy : Nonsense! Someone else must have shot the Lion.. \n Doctor : Good! You understood the story. Next patient please..'
    },

    {
      authorName: 'Paxelic',
      subredditName: 'askreddit',
      title: 'What did you think was common knowledge but honestly wasn\'s',
      voteCount: 8850,
      type: 'text',
      text: ''
    },

    {
      authorName: 'caraffa',
      subredditName: 'askreddit',
      title: 'If band names were literal, who would you want to see live the most?',
      voteCount: 2735,
      type: 'text',
      text: ''
    },

    {
      authorName: 'fahbsshakeit',
      subredditName: 'askreddit',
      title: 'Reddit at what moment in your life did you stop, chuckle, and think to yourself \'I\'m in danger\'?',
      voteCount: 31800,
      type: 'text',
      text: '',
    },

    {
      authorName: 'crazyguzz1',
      subredditName: 'worldnews',
      title: 'Democratic Party files suit alleging Russia, the Trump campaign, and WikiLeaks conspired to disrupt the 2016 election',
      voteCount: 23100,
      type: 'url',
      url: 'https://www.cnbc.com/2018/04/20/democratic-party-files-suit-alleging-russia-the-trump-campaign-and-wikileaks-conspired-to-disrupt-the-2016-election-report.html'
    },

    {
      authorName: 'Valkie',
      subredditName: 'worldnews',
      title: 'Trump Fundraiser Offered Russian Gas Company Plan to Get Sanction Lifted for $26 million',
      voteCount: 1730,
      type: 'url',
      url: 'https://theintercept.com/2018/04/20/elliott-broidy-trump-russia-sanctions/'
    },

    {
      authorName: 'OB_Bill_Brasky',
      subredditName: 'videos',
      title: 'The Legend of Old Gregg',
      voteCount: 22800,
      type: 'video',
      url: 'https://youtu.be/4LZo9ugJTWQ'
    },

    {
      authorName:'mikechi2501',
      subredditName: 'videos',
      title: 'The Difference Between Film/Television and Theater Acting.',
      voteCount: 1581,
      type: 'video',
      url: 'https://youtu.be/2TEqxuJSS08'
    },

    {
      authorName: 'VittorilloJim',
      subredditName: 'funny',
      title: 'beagle.exe has stopped working',
      voteCount: 11702,
      type: 'image',
      url: 'https://i.imgur.com/ntEIvMR.gifv'
    },

    {
      authorName: 'the_ZA',
      subredditName: 'funny',
      title: 'How I found my kitten trying to steal her big sister\'s food from the top of the fridge...',
      voteCount: 7363,
      type: 'image',
      url: 'https://www.reddit.com/r/funny/comments/8domhx/how_i_found_my_kitten_trying_to_steal_her_big/'
    },

    {
      authorName: 'maannasir',
      subredditName: 'funny',
      title: 'That\'s the reason I\'m laughing by myself all the time',
      voteCount: 37593,
      type: 'video',
      url: 'https://www.reddit.com/r/funny/comments/8dnbin/thats_the_reason_im_laughing_by_myself_all_the/'
    },

    {
      authorName: 'Greypo',
      subredditName: 'funny',
      title: 'Deadpool can try, can\'t he?',
      voteCount: 43002,
      type: 'video',
      url: 'http://i.imgur.com/4GwjfEt.gif?'
    },

    {
      authorName: 'mgt_a',
      subredditName: 'todayilearned',
      title: 'TIL until the 60\'s computing power was mesasured in "Kilo-girls" as the earliest computers where humans. And, more often than not, female',
      voteCount: 558,
      type: 'url',
      url: 'https://www.theatlantic.com/technology/archive/2013/10/computing-power-used-to-be-measured-in-kilo-girls/280633/'
    },

    {
      authorName: 'CapnFancyPants',
      subredditName: 'todayilearned',
      title: 'TIL that in 1973 the Who\'s drummer Keith Moon passed out mid-show. The band continued without him for several songs before Townshend asked, "Can anyone play the drums? - I mean somebody good?" 19 year old Scot Halpin, who had bought scalped tickets came up and played the rest of the shows.',
      voteCount: 51231,
      type: 'url',
      url: 'https://wikipedia.org/wiki/Scot_Halpin'
    },

    {
      authorName: 'Bawbnweeve',
      subredditName: 'todayilearned',
      title: 'TIL that between 1937 and 1939, 100k Irish children were encouraged to seek out the oldest person they knew and gather their sotries. This has been compiled into an archive searchable by any topic ranging from the supernatural to natural remedies.',
      voteCount: 11923,
      type: 'url',
      url: 'https://www.irishtimes.com/life-and-style/people/ireland-s-darkest-oddest-and-weirdest-secrets-uncovered-1.3418059?mode=amp'
    },

    {
      authorName: 'Morty_Goldman',
      subredditName: 'pics',
      title: 'Pretty spectacular ocean view',
      voteCount: 9283,
      type: 'image',
      url: 'https://i.imgur.com/3nQiloi.jpg'
    },

    {
      authorName: 'GallowBoob',
      subredditName: 'pics',
      title: 'An Arizona night nurse running for fun finished 2nd in the Boston Marathon',
      voteCount: 38290,
      type: 'image',
      url: 'https://i.imgur.com/VccA8HP.jpg'
    },

    {
      authorName: 'EinsteinsAura',
      subredditName: 'gaming',
      title: 'God of War\'s director, Cory Barlog, reacting to the high review scores for the game',
      voteCount: 69923,
      type: 'image',
      url: 'https://i.imgur.com/JCRrobV.gifv'
    },

    {
      authorName: '0c0163',
      subredditName: 'worldnews',
      title: 'North Korea: No need for more missile tests',
      voteCount: 0,
      type: 'url',
      url: 'http://www.bbc.co.uk/news/world-asia-43846488'
    },

    {
      authorName: 'veryawesomeguy',
      subredditName: 'worldnews',
      title: 'Kim Jong-un elevates wife to position of North Korea\'s first lady',
      voteCount: 3624,
      type: 'url',
      url: 'https://www.theguardian.com/world/2018/apr/19/kim-jong-un-elevates-wife-ri-sol-ju-to-position-of-north-koreas-first-lady'
    },

    {
      authorName: 'MostAnybody',
      subredditName: 'gaming',
      title: 'What the Fallout 5 cover art will look like',
      voteCount: 1555,
      type: 'image',
      url: 'https://i.imgur.com/7BGU2bx.png'
    },

    {
      authorName: 'urgukvn',
      subredditName: 'worldnews',
      title: 'Volcano in southern Japan erupts fro 1st time in 250 years',
      voteCount: 2902,
      type: 'url',
      url: 'https://apnews.com/b2c375785a8b45f781c02569b74a64af'
    },

    {
      authorName: 'tomj98607',
      subredditName: 'gaming',
      title: 'Taking the perfect photograph in GTA V',
      voteCount: 8651,
      type: 'image',
      url: 'http://i.imgur.com/ha5Qiq1.gif'
    },

    {
      authorName: 'Etania',
      subredditName: 'gaming',
      title: 'God of War is so dedicated to a continuous shot that it doesn\'t even have a loading screen after you start the game from the menu',
      voteCount: 17593,
      type: 'url',
      url: 'https://gfycat.com/AdolescentPopularIsabellineshrike'
    }
  ];

(function() {
  Post.create(examplePosts)
})();