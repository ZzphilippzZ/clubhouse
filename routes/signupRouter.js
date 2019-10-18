const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

/* GET home page. */
router.get('/', userController.user_create_get);

router.post('/', userController.user_create_post);

module.exports = router;
