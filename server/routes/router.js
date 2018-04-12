const router = require('express').Router();
const subredditController = require('../../db/controllers/subredditControl.js');

router.get('/subreddit', subredditController.getSubreddit);
router.post('/subreddit', subredditController.postSubreddit);

module.exports = router;