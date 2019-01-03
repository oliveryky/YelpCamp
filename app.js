var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    port = 3000,
    hostname = '127.0.0.1',
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    seedDB = require("./seeds"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user");

//require routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

//seed database
// seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Rusty is a good dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//Schema setup

// Campground.create({
//     name: "Granite Hill", 
//     image: "https://i.redd.it/e0310m5sus621.png",
//     description: "This is a huge granite hill. No water. Beautiful Granite!"
// }, function(err, campground) {
//     if(err) {
//         console.log(err);
//     }else {
//         console.log("NEWLY CREATED CAMPGROUND : ");
//         console.log(campground);
//     }
// });

// var campgrounds = [
//     {name: "Salmon Creek", image: "https://i.redd.it/e0310m5sus621.png"},
//     {name: "Camp 2", image: "https://i.redd.it/e0310m5sus621.png"},
//     {name: "Third Camp", image: "https://i.redd.it/2z0aim8hrt621.jpg"},
//     {name: "Salmon Creek", image: "https://i.redd.it/e0310m5sus621.png"},
//     {name: "Camp 2", image: "https://i.redd.it/e0310m5sus621.png"},
//     {name: "Third Camp", image: "https://i.redd.it/2z0aim8hrt621.jpg"}
// ];

app.listen(process.env.PORT || port, process.env.IP || hostname, function() {
    console.log("The YelpCamp Server has started!");
});
