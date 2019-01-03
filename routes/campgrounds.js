var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleWare = require("../middleware");

//INDEX route
//default show all campgrounds
router.get("/", function(req, res) {
    //render overload
    // res.render("campgrounds", {campgrounds:campgrounds});

    //get all campgrounds from DB -> render
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        }else {
            console.log("CAMPGROUNDS: ");
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});

//CREATE route
//route to create campground
//post has same url as get
//get is for when someone reads all the campgrounds page
//post is for when someone is making a new campground page(their editing page)
router.post("/", middleWare.isLoggedIn, function(req, res) {
    //get data from form -> add to campgrounds array
    //redirect back to campgrounds page

    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    // campgrounds.push({name: name, image: image});
    //create new campground -> save to DB
    Campground.create({name: name, image: image, description: desc, price: price, author: author}, function(err, newCamp) {
        if(err) {
            console.log(err);
        }else {
            console.log("NEW CAMPGROUND CREATED: ");
            console.log(newCamp);
            res.redirect("/campgrounds");
        }
    });

    // res.redirect("/campgrounds");
});

//NEW route
//show the form that will post data
router.get("/new", middleWare.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//SHOW route
//shows more info about a campground
router.get("/:id", function(req, res) {
    //find campground with provided ID
    //Find by ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCG) {
        if(err) {
            console.log(err);
        }else {
            console.log(foundCG);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCG});
        }
    });
});

//EDIT Campground route
router.get("/:id/edit", middleWare.checkCGOwner, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCG) {
        res.render("campgrounds/edit", {campground: foundCG});
    });
});

//UPDATE Campground route
router.put("/:id", middleWare.checkCGOwner, function(req, res) {
    //find and update correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCG) {
        if(err) {
            res.redirect("/campgrounds");
        }else {
            //redirect to show page
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY route
router.delete("/:id", middleWare.checkCGOwner, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/campgrounds");
        }else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;