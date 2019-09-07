const User = require('../models/user');
const Password = require('../models/password');

const validator = require('express-validator');

const async = require('async');

exports.user_create_get = (req, res) => {
	res.render('signup_form');
};

exports.user_create_post = [ 

	validator.body('firstName', 'First name required')
	.trim()
	.escape()
	.isEmpty({ignore_whitespace: true})
	.isAlpha(),

	validator.body('lastName', 'Last name required')
	.trim()
	.escape()
	.isEmpty({ignore_whitespace: true})
	.isAlpha(),

	validator.body('username', 'Username required')
	.trim()
	.escape()
	.isEmpty({ignore_whitespace: true})
	.isAlphanumeric()
	.custom(usernameExists),

	validator.body('email', 'Email required')
	.trim()
	.escape()
	.isEmail()
	.custom(emailExists),

	validator.body('password', 'Password must have at least six characters')
	.trim()
	.escape()
	.isLength({min: 6}),

	(req, res, next) => {
			const errors = validator.validationResult(req);

			let user = new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
				isMember: isMember(req.body.memberPassword),
				isAdmin: isAdmin(req.body.adminPassword)
			});

			if(!errors.isEmpty()) {
				res.render('signup_form', {user: user, errors: errors.array()});
					return;
			}
			else {
				saveUser(user);
			}
	}
];

function usernameExists() {
	User.findOne({'username': req.body.username})
	.exec(function(err, usernameExists) {
		if(err) return next(err);
		if(usernameExists) {
			return false;
		}
		return true;
	}
}

function emailExists() {
	User.findOne({'email': req.body.email})
	.exec(function(err, emailExists) {
		if(err) return next(err);
		if(emailExists) {
			return false;
		}
		return true;
	}
}

function saveUser(user) {
	user.save(err => {
		if(err) return next(err);
		console.log('User created');
	}
}

function isMember(memberPassword) {
	return memberPassword === getMemberPassword();
}

function getMemberPassword() {
	Password.findOne({'name': 'memberPassword'})
	.exec((err, memberPassword) => {
		if(err) return next(err);
		return memberPassword.value;
	}
}

function isAdmin(adminPassword) {
	return adminPassword === getAdminPassword();
}

function getAdminPassword() {
	Password.findOne({'name': 'adminPassword'})
	.exec((err, adminPassword) => {
		if(err) return next(err);
		return adminPassword.value;
	}
}
