const Post = require('../models/post');

exports.post_list_get = (req, res) => {
	if(!req.user) {
		res.redirect('/sign-in');
	}
	res.locals.currentUser = req.user;
	res.render('post_list');
};
