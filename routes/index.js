const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

/* GET home page. */
router.get('/', (req, res) => {
	res.redirect('/sign-up');
});

module.exports = router;
