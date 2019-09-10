const User = require('../models/user');
const Password = require('../models/password');

const bcrypt = require('bcryptjs');
const validator = require('express-validator');

exports.user_create_get = (req, res) => {
	res.render('signup_form');
};

exports.user_create_post = [ 

	validator.body('firstName', 'First name required')
	.trim()
	.escape()
	.isLength({min: 1})
	.isAlpha(),

	validator.body('lastName', 'Last name required')
	.trim()
	.escape()
	.isLength({min: 1})
	.isAlpha(),

	validator.body('username', 'Username required')
	.trim()
	.escape()
	.isLength({min: 1})
	.isAlphanumeric()
	.custom(async (username) => {
		if(await usernameExists(username)) {
			return Promise.reject('Username is taken');
		}
	}),

	validator.body('email', 'Email required')
	.trim()
	.escape()
	.isEmail()
	.custom(async (email) => {
		if(await emailExists(email)) {
			return Promise.reject('Email is already registered');
		}
	}),

	validator.body('password', 'Password must have at least six characters')
	.trim()
	.escape()
	.isLength({min: 6}),

	async (req, res, next) => {
			const errors = validator.validationResult(req);

			let newUser = new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
				isMember: await isMember(req.body.memberPassword),
				isAdmin: await isAdmin(req.body.adminPassword)
			});

			if(!errors.isEmpty()) {
				res.render('signup_form', {newUser: newUser, errors: errors.array()});
					return;
			}
			else {
				await saveUser(newUser);
				res.render('signup_form');
					return;
			}
	}
];

async function usernameExists(value) {
	let user = await User.findOne({username: value})
	.exec();
	if(user) return true;
	return false;
}

async function emailExists(value) {
	let user = await User.findOne({email: value})
	.exec();
	if(user) return true;
	return false;
}

async function saveUser(newUser) {
	newUser.save(err => {
		if(err) return next(err);
	});
}

async function isMember(memberPassword) {
	return memberPassword === await getMemberPassword();
}

async function getMemberPassword() {
	let password = await Password.findOne({name: 'memberPassword'})
	.exec();
	return password.value;
}

async function isAdmin(adminPassword) {
	return adminPassword === await getAdminPassword();
}

async function getAdminPassword() {
	let password = await Password.findOne({name: 'adminPassword'})
	.exec();
	return password.value;
}
