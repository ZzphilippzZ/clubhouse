const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
	if(req.user) {
		res.redirect('/post');
	}
	res.redirect('/sign-up');
});

module.exports = router;
