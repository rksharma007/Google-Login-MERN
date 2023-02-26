const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('config');
const User = require('../models/User');

const secretOrKey = config.get('JWT_SECRET');

// JWT strategy
const jwtLogin = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromHeader('x-auth-token'),
    secretOrKey: secretOrKey,
  },
  async (payload, done) => {
    try {
      //console.log("This is payload", payload);
      const user = await User.findById(payload._id);

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err, false);
    }
  },
);

passport.use(jwtLogin);