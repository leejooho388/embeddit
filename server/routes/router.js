const router = require('express').Router();
const subredditController = require('../../db/controllers/subredditControl.js');

router.get('/subreddit', subredditController.getSubreddit);
router.get('/subreddit/:query', subredditController.getQuerySubreddit);
router.post('/subreddit', subredditController.postSubreddit);
const newPost = require('../../db/controllers/postController.js');
// send to /posts
router.post('/post', newPost.newPost)

const passport = require('passport');

const createUser = require('../../db/controllers/createUser');

// old express-session auth
// const { checkUser, logOut } = require('../../client/utils/sessionHelper');

router.post('/login', passport.authenticate('local',
  { successRedirect: '/'
    // failureFlash: true,
  }), (req, res) => {
  console.log('here', req.body.username);
  console.log('here', req.body.password);
  res.status(200).end();
  // res.header("Access-Control-Allow-Headers","*")
  // res.header('auth', JSON.stringify({ token: token})
});

router.post('/signup', createUser);

// old logout
// router.get('/logout', logOut);

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




// localStorage.setItem('token', token);

// must put jwt in http headers
// res.header("Access-Control-Allow-Headers","*")
// res.header('auth', JSON.stringify({ token: token})






// app.get('/protected', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//    if (err) { return next(err) }
//    if (!user) { return res.redirect('/signin') }
//      res.redirect('/account');
//    })(req, res, next);
//  });