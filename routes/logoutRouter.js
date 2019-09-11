const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

/* GET home page. */
router.get('/', userController.user_logout_get);

module.exports = router;
