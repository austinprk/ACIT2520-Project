// npm start
//https://www.npmjs.com/package/express-session#storeallcallback
//https://www.passportjs.org/packages/passport-github2/
//https://www.passportjs.org/packages/passport-local/
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");
//const GithubStrategy = require("passport-github2").Strategy;

// const githubLogin = new GithubStrategy ({
//   clientID: "478afd75e5054a9ddd03",
//   clientSecret: "86d547a324a46f0e8c98b55923dd6463bc604604",
//   callbackURL: "/auth/github/callback",
// },
// (accessToken, refreshToken, profile, done) => {
//   const user=userController.findOrCreate(profile);
//   return user
//     ? done(null, user)
//     : done(null, false, {
//       message: "Your login details are not valid. Please try again"
//     });
//   }
// );

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin); //.use(githubLogin);
