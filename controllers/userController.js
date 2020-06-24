const User = require('../models/userModel');
const Note = require("../models/noteModel");
const passport = require('passport');
const bcrypt = require('bcrypt');


exports.index = function (req, res) {
    res.send("User controller index!")
}

exports.getRegisterUser = function (req, res) {
    res.send("User controller register - GET!")
}

exports.postRegisterUser = function (req, res, next) {
    const { email, password, passwordConfirm } = req.body;
    let errors = [];
    // check empty fields
    if (!email || !password || !passwordConfirm) {
        errors.push({ msg: 'Please fill all fields' });
    }
    // check password confirm
    if (password != passwordConfirm) {
        errors.push({ msg: 'Passwords did not match' });
    }
    // check pwd characer length
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }
    // check if email already exist
    // User.findOne({ email: email }).then(user => {
    //     if (user) errors.push({ msg: 'Email already exists' });
    // });
    // if there is an error
    if (errors.length > 0) {
        res.send({
            errors,
            email,
            password,
            passwordConfirm
        });
    } else {
        // check if email already exist
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.send({
                    errors,
                    email,
                    password,
                    passwordConfirm
                });
            } else {
                // all things being equal
                const newUser = new User({
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.log(err);
                        // assign hash as a pwd and save the user
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                console.log("User created successfully!");

                                new Note({
                                    uid: user._id,
                                    noteArray: []

                                }).save()
                                .then(note =>{
                                    res.send({errors});
                                   
                                    
                                })
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
    // res.send("User controller register - POST!")
}

exports.getLoginUser = function (req, res) {
    res.send("User controller login - GET!")
}

exports.postLoginUser = function (req, res, next) {
    // res.send("User controller login - POST!")

    passport.authenticate('local', {
        successRedirect: '/success',
        failureRedirect: '/failure',
        failureFlash: false
    })(req, res, next);
}

exports.isLogged = function(req, res){

    if(!req.user) res.send (false);
    else res.send(true);
}

exports.logoutUser = function(req, res){
    
    if(!req.user) res.send("There is no user");
    else{
        req.logout();
        res.send("logged out");
    }

   
}