const router = require('express').Router();
const subredditController = require('../../db/controllers/subredditControl.js');
const postController_get = require('../../db/controllers/postController_get')

router.get('/subreddit', subredditController.getSubreddit);
router.get('/subreddit/:query', subredditController.getQuerySubreddit);
router.post('/subreddit', subredditController.postSubreddit);
const newPost = require('../../db/controllers/postController.js');
// send to /posts
router.post('/post', newPost.newPost)

router.get('/posts', postController_get.get);

module.exports = router;