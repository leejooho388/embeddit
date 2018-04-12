const router = require('express').Router();
const subredditController = require('../../db/controllers/subredditControl.js');

router.get('/subreddit', subredditController.getSubreddit);
router.get('/subreddit/:query', subredditController.getQuerySubreddit);
router.post('/subreddit', subredditController.postSubreddit);
const newPost = require('../../db/controllers/postController.js');
// send to /posts
router.post('/post', newPost.newPost)


// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

const loginUser = require('../../db/controllers/loginUser');
const createUser = require('../../db/controllers/createUser');

const { checkUser, logOut } = require('../../client/utils/sessionHelper');

router.post('/login', loginUser);

router.post('/signup', createUser);

router.get('/logout', logOut);

module.exports = router;

//middleware
// passport.authenticate('local', { successRedirect: '/', failureFlash: true })

// passport.use(new LocalStrategy((username, password, done) => {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));
