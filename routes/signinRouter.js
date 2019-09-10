const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

/* GET home page. */
router.get('/signin', userController.user_signin_get);

router.post('/signin', userController.user_signin_post);

module.exports = router;
