const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

/* GET home page. */
router.get('/', userController.user_signin_get);

router.post('/', userController.user_signin_post);

module.exports = router;
