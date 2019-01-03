var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleWare = require("../middleware");

//COMMENTS ROUTES
router.get("/new", middleWare.isLoggedIn, function(req, res) {
    //find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        }else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//create comments
router.post("/", middleWare.isLoggedIn, function(req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        }else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    req.flash("error", "Oops! Something went wrong.")
                    console.log(err);
                }else {
                    //add username and id to cmment
                    //save comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    //connect new comment to camgpround
                    campground.comments.push(comment);
                    campground.save();
                    //redirect campground show page
                    req.flash("success", "Comment posted successfully!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            }); 
        }
    });
});

//EDIT Route
router.get("/:comment_id/edit", middleWare.checkCommentOwner, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, fComment) {
        if(err) {
            res.redirect("back");
        }else {
            res.render("comments/edit", {campground_id: req.params.id, comment: fComment});
        }
    })
});

//UPDATE Route
router.put("/:comment_id", middleWare.checkCommentOwner, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, uComment) {
        if(err) {
            res.redirect("back");
        }else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY Route
router.delete("/:comment_id", middleWare.checkCommentOwner, function(req, res) {
    //find by Id and remove
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err) {
            res.redirect("back");
        }else {
            req.flash("success", "Comment deleted successfully!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;