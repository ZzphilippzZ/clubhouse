const express = require('express');

const router = express.Router();

const postController = require('../controllers/postController');

router.route('/')
  .get(postController.post_list_get)
  .post(postController.post_delete_post);

router.route('/create')
  .get(postController.post_create_get)
  .post(postController.post_create_post);


module.exports = router;
