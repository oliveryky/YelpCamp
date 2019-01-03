var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middleWare = {
    //check campground owner
    checkCGOwner: function (req, res, next) {
        //check if user is logged in
        if(req.isAuthenticated()) {
            Campground.findById(req.params.id, function(err, foundCG) {
                if(err) {
                    req.flash("error", "Campground not found.");
                    res.redirect("back");
                }else {
                    //does user own campground
                    if(foundCG.author.id.equals(req.user._id)) {
                        next();
                    }else {
                        req.flash("error", "You do not have the permission to do that!");
                        res.redirect("back");
                    }
                }
            });
        }else {
            req.flash("error", "Please Login First.");
            res.redirect("back");
        }
    },

    //check comment owner
    checkCommentOwner: function (req, res, next) {
        //check if user is logged in
        if(req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, function(err, fComment) {
                if(err) {
                    req.flash("error", "Comment not found.");
                    res.redirect("back");
                }else {
                    //does user own campground
                    if(fComment.author.id.equals(req.user._id)) {
                        next();
                    }else {
                        req.flash("error", "You do not have the permission to do that!");
                        res.redirect("back");
                    }
                }
            });
        }else {
            req.flash("error", "Please login first.");
            res.redirect("back");
        }
    },

    //check if user is logged in
    isLoggedIn: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
    
        req.flash("error", "Please login first.");
        res.redirect("/login");
    }
};

module.exports = middleWare;