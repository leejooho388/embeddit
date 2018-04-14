const router = require('express').Router();
const subredditController = require('../../db/controllers/subredditControl.js');
const postController = require('../../db/controllers/postController.js')

const jwt = require('jsonwebtoken');

const postController_get = require('../../db/controllers/postController_get')

router.route('/posts')
  .get(postController_get.get);

const postController_get = require('../../db/controllers/postController_get')

const postController = require('../../db/controllers/postController.js')

// SUBREDDIT
router.get('/subreddit', subredditController.getSubreddit);
router.get('/subreddit/:query', subredditController.getQuerySubreddit);
router.post('/subreddit', subredditController.postSubreddit);

// POST
router.get('/post', postController.get);
router.post('/post', postController.newPost)


const passport = require('passport');

const createUser = require('../../db/controllers/createUser');

router.post('/login', passport.authenticate('local',
  { session: false }), (req, res) => {

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
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;




// // verify a token symmetric
// jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
//   // decoded is json
// });




// app.get('/protected', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//    if (err) { return next(err) }
//    if (!user) { return res.redirect('/signin') }
//      res.redirect('/account');
//    })(req, res, next);
//  });
=======
// POST
router.get('/post', postController.get);
router.post('/post', postController.newPost)

>>>>>>> refactored post related files

module.exports = router;
>>>>>>> set up get request for posts and pushed in fake post data
