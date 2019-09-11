const Post = require('../models/post');

exports.post_list_get = (req, res) => {
	res.locals.currentUser = req.user;
	res.render('post_list');
};
