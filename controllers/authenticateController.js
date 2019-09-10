const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(
	new LocalStrategy(async (username, password, done) => {
		let user = await getUserByUsername(username);
		
		if(user && await isCorrectPassword(password, user.password)) {
			return done(null, user);
		}
        	return done(null, false, { msg: "Invalid credentials" });
	
    	})
);

async function getUserByUsername(username) {
	return await User.findOne({username: username});
}

async function passwordsMatch(inputPassword, actualPassword) {
	let correctPassword = await bcrypt.compare(inputPassword, actualPassword);
	console.log(correctPassword);
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
