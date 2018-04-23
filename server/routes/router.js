const router = require('express').Router();
const subredditController = require('../../db/controllers/subredditControl');
const postController = require('../../db/controllers/postController');
const commentController = require('../../db/controllers/commentController');
const postVoteController = require('../../db/controllers/postVoteController');
const commentVoteController = require('../../db/controllers/commentVoteController');

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
router.get('/posts/:userId', postController.get);
router.post('/post', postController.newPost);
router.get('/post/user/newest', postController.getNewestByUser);
router.get('/post/:postId', postController.getPostById);

// COMMENTS
router.get('/comments/:parentType/:parentId', commentController.get);
router.post('/comments', commentController.post);

// POST VOTES
router.post('/r/:subreddit/:id/vote', postVoteController.post);
router.put('/r/:subreddit/:id/vote', postVoteController.put);

// COMMENT VOTES
router.post('/comment/vote/:commentId', commentVoteController.post);
router.put('/comment/vote/:commentId', commentVoteController.put);

// SUBREDDIT PAGE
router.get('/r/:subreddit/', postController.getSubreddit);

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

module.exports = router;

