const User = require('../models/user');

exports.user_create_get = (req, res) => {
	res.render('signup_form');
};

exports.user_create_post = (req, res) => {
	res.send('NOT IMPLEMENTED: user_create_post');
};
