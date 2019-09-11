const Post = require('../models/post');

exports.post_list_get = async (req, res) => {
	if(!req.user) {
		res.redirect('/sign-in');
	}

	res.locals.currentUser = req.user;
	list_posts = await getPosts();
	res.render('post_list', {post_list: list_posts});
};

async function getPosts() {
	return await Post.find().exec();
}
