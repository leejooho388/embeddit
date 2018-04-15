const User = require('../models/Users.js');
const Subreddit = require('../models/Subreddits.js');

var getQuerySubreddit = function(req, res){
  Subreddit.find({'_id': req.params.query}).exec(function(err, subreddits){
    if(subreddits === undefined){
      Subreddit.find({'name': req.params.query}).exec(function(err, subreddits){
        res.send(subreddits || {});
      })
      return;
    }
    res.send(subreddits);
  });
};

var getSubreddit = function(req, res){
  Subreddit.find({}).exec(function(err, subreddits){
    res.send(subreddits);
  });
};

var postSubreddit = function(req, res){
  new Subreddit({
    name: req.body.name,
    subscriberCount: 0,
    description: req.body.description,
  }).save(function(err){
    if(err){
      console.log(err);
      return res.end('error');
    }

    res.end();
  });
};

// DATA SHOULD INCLUDE: name (name of subreddit), change (increment number)
var subscribe = function(req, res){
  Subreddit.findOneAndUpdate({name: req.body.subredditName}, {$inc : {'subscriberCount' : req.body.change }}).exec(function(err, response){
    if(err){
      return res.send(err);
    }
    console.log('subreddit: ',req.body);
    User.find({'username': req.body.username}, function(err, response) {
      if (err) {
        return res.send(err);
      }
      let subredditIds = response[0].subredditIds;
      let index = subredditIds.indexOf(req.body.subredditName)
      if (index !== -1) {
        subredditIds.splice(index, 1);
      } else {
        subredditIds.push(req.body.subredditName);
      }

      User.findOneAndUpdate({name: req.body.user}, {'subredditIds': subredditIds}).exec(function(err, response) {
        if(err) {
          response.send(err);
        }
        res.send();
      })
    })
    res.end();
  });
};

module.exports.getSubreddit = getSubreddit;
module.exports.getQuerySubreddit = getQuerySubreddit;
module.exports.postSubreddit = postSubreddit;
module.exports.subscribe = subscribe;