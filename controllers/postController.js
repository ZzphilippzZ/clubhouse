const validator = require('express-validator');
const validatorBody = validator.body;
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
	return await Post.find()
		.populate('user')
		.exec();
}

exports.post_create_get = (req, res) => {
	if(!req.user) {
		res.redirect('/sign-in');
	}

	res.locals.currentUser = req.user;
	res.render('post_form');
};

exports.post_create_post = [ 

	validatorBody('title', 'Title is required').trim().isLength({min: 1}).escape(),
	validatorBody('body', 'Body is required').trim().isLength({min: 1}).escape(),
	
	async (req, res, next) => {

		const errors = validator.validationResult(req);
		if(!errors.isEmpty()) {
			res.render('post_form', {errors: errors.array()});
		}
		else {
			let post = await createNewPost(req);
			post.save(err => {
				if(err) return next(err);
				res.redirect('/post')
			});
		}
	}
];

async function createNewPost(req) {
	return new Post({
		title: req.body.title,
		body: req.body.body,
		user: req.user._id
	});
}
