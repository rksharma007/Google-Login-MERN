const express = require("express");
const router = express.Router();

const auth = require('../../middleware/auth');

router.get('/me', auth, (req, res) => {
    const me = req.user;
    //console.log(me);
    res.json(me);
});


module.exports = router;