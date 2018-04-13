const router = require('express').Router();
const postController_get = require('../../db/controllers/postController_get')

router.route('/posts')
  .get(postController_get.get);

module.exports = router;