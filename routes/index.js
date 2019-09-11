const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

/* GET home page. */
router.get('/sign-up', userController.user_create_get);

router.post('/sign-up', userController.user_create_post);

module.exports = router;
