const router = require('express').Router();
const subredditController = require('../../db/controllers/subredditControl.js');
const postController = require('../../db/controllers/postController.js')

// SUBREDDIT
router.get('/subreddit', subredditController.getSubreddit);
router.get('/subreddit/:query', subredditController.getQuerySubreddit);
router.post('/subreddit', subredditController.postSubreddit);

// POST
router.get('/post', postController.get);
router.post('/post', postController.newPost)


module.exports = router;