const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const auth  = require('../middleware/auth');

router.get('/', [auth, admin], (req, res) => {
    res.send('Hello World');
    //res.render('index',{title: 'My Express App', message: "Hello World"})
});

module.exports = router;