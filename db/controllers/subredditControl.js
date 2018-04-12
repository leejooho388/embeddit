const Subreddit = require('../models/Subreddits.js');

var getSubreddit = function(req, res){
  if(req.body._id){
    Subreddit.find({ _id: req.body._id }).exec(function(err, subreddits){
      res.send(subreddits);
    });  
  }

  if(req.body.query){
    Subreddit.find({ name: req.body.query }).exec(function(err, subreddits){
      res.send(subreddits);
    });
  }

  Subreddit.find({}).exec(function(err, subreddits){
    res.send(subreddits);
  });
}

var postSubreddit = function(req, res){
  console.log(req.body);
  new Subreddit({
    name: req.body.name,
    subscriberCount: 0,
    description: req.body.description,
  }).save(function(err){
    if(err){
      console.log(err);
      return res.end();
    }

    res.end();
  });
}

module.exports.getSubreddit = getSubreddit;
module.exports.postSubreddit = postSubreddit;