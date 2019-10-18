const passport = require('passport');
const bcrypt = require('bcryptjs');
const validator = require('express-validator');

const User = require('../models/user');
const Password = require('../models/password');

exports.user_create_get = (req, res) => {
  if (req.user) {
    res.locals.currentUser = req.user;
    res.redirect('/post');
  }
  res.render('signup_form');
};

async function usernameExists(value) {
  const user = await User.findOne({ username: value })
    .exec();
  if (user) return true;
  return false;
}

async function emailExists(value) {
  const user = await User.findOne({ email: value })
    .exec();
  if (user) return true;
  return false;
}

async function saveUser(newUser) {
  newUser.save((err, user) => {
    if (err) return err;
    return user;
  });
}

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function getMemberPassword() {
  const password = await Password.findOne({ name: 'memberPassword' })
    .exec();
  return password.value;
}

async function isMember(memberPassword) {
  return memberPassword === await getMemberPassword();
}

async function getAdminPassword() {
  const password = await Password.findOne({ name: 'adminPassword' })
    .exec();
  return password.value;
}

async function isAdmin(adminPassword) {
  return adminPassword === await getAdminPassword();
}

async function login(user, req, res) {
  req.login((err) => {
    if (err) return err;
    res.locals.currentUser = user;
    return res.redirect('/post');
  });
}


exports.user_create_post = [

  validator.body('firstName', 'First name required')
    .trim()
    .escape()
    .isLength({ min: 1 })
    .isAlpha(),

  validator.body('lastName', 'Last name required')
    .trim()
    .escape()
    .isLength({ min: 1 })
    .isAlpha(),

  validator.body('username', 'Username required')
    .trim()
    .escape()
    .isLength({ min: 1 })
    .isAlphanumeric()
    .custom(async (username) => {
      if (await usernameExists(username)) {
        return Promise.reject(new Error('Username is taken'));
      }
      return Promise.resolve();
    }),

  validator.body('email', 'Email required')
    .trim()
    .escape()
    .isEmail()
    .custom(async (email) => {
      if (await emailExists(email)) {
        return Promise.reject(new Error('Email is already registered'));
      }
      return Promise.resolve();
    }),

  validator.body('password', 'Password must have at least six characters')
    .trim()
    .escape()
    .isLength({ min: 6 }),

  async (req, res) => {
    const errors = validator.validationResult(req);

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: await hashPassword(req.body.password),
      isMember: await isMember(req.body.memberPassword),
      isAdmin: await isAdmin(req.body.adminPassword),
    });

    if (!errors.isEmpty()) {
      return res.render('signup_form', { newUser, errors: errors.array() });
    }

    await saveUser(newUser);
    return login(newUser, req, res);
  },
];

exports.user_signin_get = (req, res) => {
  if (req.user) {
    res.locals.currentUser = req.user;
    res.redirect('/post');
  }
  res.render('signin_form');
};

exports.user_signin_post = [
  passport.authenticate('local', {
    successRedirect: '/post',
    failureRedirect: '/sign-in',
  }),
];

exports.user_logout_get = (req, res) => {
  req.logout();
  res.redirect('/sign-in');
};
