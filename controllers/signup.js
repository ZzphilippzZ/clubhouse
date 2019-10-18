const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password' });
      }

      bcrypt.compare(password, user.password, (res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user);
        }
        // passwords do not match!
        return done(null, false, { msg: 'Incorrect username or password' });
      });

      return done(null, user);
    });
  },
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

exports.signup = (req, res) => {
  if (req.user) {
    res.locals.currentUser = req.user;
    res.redirect('/post');
  }
  res.render('signup');
};
