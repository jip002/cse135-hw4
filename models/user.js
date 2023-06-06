const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    // name:{
    //     type: String,
    //     minlength: 5,
    //     maslength: 50
    // },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maslength: 255
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maslength: 1024
    },
    admin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateToken = function() {
    const token = jwt.sign({ _id: this._id, admin: this.admin }, config.get('jip002key'));
    return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(req){
    const schema = Joi.object({
        //name: Joi.string().min(5).max(50),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(req);
};

exports.User = User;
exports.validate = validateUser;