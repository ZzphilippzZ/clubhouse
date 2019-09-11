const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.get('/', postController.post_list_get);

module.exports = router;
