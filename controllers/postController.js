const Post = require('../models/post');

exports.post_list = (req, res) => {
	if(err) return next(err);
	res.render('post_list');
};
