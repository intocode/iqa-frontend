const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  cb(null, id);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      scope: ['user:email'],
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile)
    }
  )
);
