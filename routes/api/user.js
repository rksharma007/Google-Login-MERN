const express = require("express");
const router = express.Router();

const auth = require('../../middleware/auth');

router.get('/me', auth, (req, res) => {
    try {
        const me = req.user;
        res.json(me);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;