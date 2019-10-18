const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/user');

async function getUserByUsername(username) {
  return User.findOne({ username });
}

async function passwordsMatch(inputPassword, actualPassword) {
  return bcrypt.compare(inputPassword, actualPassword);
}

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await getUserByUsername(username);

    if (user && await passwordsMatch(password, user.password)) {
      return done(null, user);
    }

    return done(null, false, { msg: 'Invalid credentials' });
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
