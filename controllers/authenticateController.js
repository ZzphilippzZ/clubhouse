const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/user');

passport.use(
	new LocalStrategy(async (username, password, done) => {
		let user = await getUserByUsername(username);
		
		if(user && await passwordsMatch(password, user.password)) {
			return done(null, user);
		}
        	return done(null, false, { msg: "Invalid credentials" });
	
    	})
);

async function getUserByUsername(username) {
	return await User.findOne({username: username});
}

async function passwordsMatch(inputPassword, actualPassword) {
	return await bcrypt.compare(inputPassword, actualPassword);
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;
