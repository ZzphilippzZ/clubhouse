'use strict';

const User = require('../models/user');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password' });
      }

	bcrypt.compare(password, user.password, (err, res) => {
  		if (res) {
    			// passwords match! log user in
    			return done(null, user)
  		} else {
    			// passwords do not match!
    			return done(null, false, {msg: "Incorrect password"})
  		}
	})

      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

exports.signup = (req, res) {
	res.render('signup');
};
