var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res) {
    //ejs -> template language to render html using js
    //render vs send 
    res.render("landing");
});

//AUTHENTICATION ROUTES
//show register form
router.get("/register", function(req, res) {
    res.render("register");
});

//handle signup logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            req.flash("error", err.message + ".");
            return res.redirect("/register");
        }

        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to YelpCamp, " + user.username + ".");
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", function(req, res) {
    res.render("login");
});

//handling login logic
//app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "login"
    }), function(req, res) {
});

//logout logic
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Successfully logged out.");
    res.redirect("/campgrounds");
});

module.exports = router;