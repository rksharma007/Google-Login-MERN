const express = require("express");
const passport = require("passport");
const config = require('config');
const router = express.Router();

const auth = require('../../middleware/auth');
const frontendUrl = config.get('FRONTEND_URL');

router.get("/", (req, res) => {
    res.status(200).json({
        googleClientID: config.get('GOOGLE_CLIENT_ID'),
        googleCLientSecret: config.get('GOOGLE_CLIENT_SECRET'),
    });
});

// google routes

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        session: false,
    }),
    (req, res) => {
        //console.log(req.user);
        const token = req.user.generateJWT();
        res.cookie('x-auth-cookie', token);
        res.redirect(`${frontendUrl}/dashboard`);
    },
);


router.get("/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);


router.get('/me', auth, (req, res) => {
    const me = req.user;
    console.log(me);
    res.json(me);
});

router.get("/logout", (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect(`${frontendUrl}/`);
      });
});

module.exports = router;