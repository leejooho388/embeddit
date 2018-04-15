const router = require('express').Router();
const subredditController = require('../../db/controllers/subredditControl');
const postController = require('../../db/controllers/postController');
const commentController = require('../../db/controllers/commentController');
const voteController = require('../../db/controllers/voteController');

const jwt = require('jsonwebtoken');

// SUBREDDIT
router.get('/subreddit', subredditController.getSubreddit);
router.get('/subreddit/:query', subredditController.getQuerySubreddit);
router.post('/subreddit', subredditController.postSubreddit);
router.post('/subscribe', (req, res) => {
  subredditController.subscribe(req, res, newUser => {
    const token = jwt.sign({ user: newUser}, 'your_jwt_secret', { expiresIn: '7 days' });    
    
    res.header("Access-Control-Allow-Headers", "*");
    res.header('auth', JSON.stringify({ token: token }));

    res.end();
  })
});

// POST
router.get('/post', postController.get);
router.post('/post', postController.newPost);
router.get('/post/user/newest', postController.getNewestByUser);

// COMMENTS
router.get('/comments', commentController.get);
router.post('/comments', commentController.post);

// VOTES
router.post('/r/:subreddit/:id/vote', voteController.post);
router.put('/r/:subreddit/:id/vote', voteController.put);

const passport = require('passport');

const createUser = require('../../db/controllers/createUser');

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {

  const token = jwt.sign({ user: req.user}, 'your_jwt_secret', { expiresIn: '7 days' });

  res.header("Access-Control-Allow-Headers", "*");
  res.header('auth', JSON.stringify({ token: token }));
  res.status(200).end();
});

router.post('/signup', (req, res) => {
  createUser(req, res, user => {
    const token = jwt.sign({ user: user}, 'your_jwt_secret', { expiresIn: '7 days' });

    res.header("Access-Control-Allow-Headers", "*");
    res.header('auth', JSON.stringify({ token: token }));
    res.status(200).end();
  });
});

// Passport logout
// router.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });

module.exports = router;





// app.get('/protected', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//    if (err) { return next(err) }
//    if (!user) { return res.redirect('/signin') }
//      res.redirect('/account');
//    })(req, res, next);
//  });
