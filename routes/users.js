const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
    // const users = await User.find().sort('name');
    // res.send(users);
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('Email already registered.');

    user = new User({
        //name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    result = await user.save();
    console.log(result);

    //const token = jwt.sign({ _id: user._id }, config.get('jip002key'));
    const token = user.generateToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'email', 'admin']));
});

module.exports = router;