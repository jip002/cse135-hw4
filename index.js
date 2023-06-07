const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
//routes
const home = require('./routes/home')
const users = require('./routes/users');
const auth = require('./routes/auth');

app = express();

if(!config.get('jip002key')) {
    console.error('FATAL ERROR: jip002key is not defined.');
    process.exit(1);
}

app.use(express.json());
app.use('/', home);
app.use('/api/users', users);
app.use('/api/auth', auth);

mongoose.connect('mongodb://localhost/testUser')
    .then(()=> console.log("connected to mongodb..."))
    .catch(err => console.error('could not connect to mongodb...', err));
//const port2 = process.env.PORT || 3000;
const port = 3000;
app.listen(port, () => console.log(`listening to port ${port}...`));