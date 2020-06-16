const express = require("express");

const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const passport = require("passport");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
var LocalStrategy = require("passport-local").Strategy;

const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRouter");

//model
const User = require("./models/userModel");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));



mongoose.connect("mongodb+srv://admin-resul:test123@cluster0-xo02p.mongodb.net/noteDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

mongoose.connection.on("error", err => {
    console.log(err);
});

app.use(session({
    secret: "I am asecret",
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `done` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new LocalStrategy(
    { usernameField: "email" },
    function (username, password, done) {
        User.findOne({ email: username }, function (err, user) {
            if (err) { return done(err); }

            if (!user) {
                return done(null, false, { message: "Incorrect mail." })
            }

            bcrypt.compare(password, user.password, function (err, result) {
                if (err) console.log(err);
                // result === true
                if (result) return done(null, user);
                else return done(null, false, { message: "Incorrect password" });

            });

            // if (user.password != password) { return done(null, false); }
            // return done(null, user);
        });
    }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    })

});


// app.use(function(req, res, next){
//     console.log("user "+req.user);    
//     console.log(req.path);
//     if(req.user || req.path==="/login") next();
//     else{

//         res.sendFile(path);
//     }

// });

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/note", noteRouter);

const port = 5000;
app.listen(port, () => console.log("the server has started at port 5000"));












