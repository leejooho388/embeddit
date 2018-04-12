const router = require('express').Router();
const subredditController = require('../../db/controllers/subredditControl.js');

router.get('/subreddit', subredditController.getSubreddit);
router.get('/subreddit/:query', subredditController.getQuerySubreddit);
router.post('/subreddit', subredditController.postSubreddit);
const newPost = require('../../db/controllers/postController.js');
// send to /posts
router.post('/post', newPost.newPost)

module.exports = router;