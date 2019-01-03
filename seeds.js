var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://pixabay.com/get/e83cb10f2df11c22d2524518b7444795ea76e5d004b0144593f1c87eaeeeb0_340.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc orci turpis, consectetur eget risus nec, accumsan imperdiet augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut est sit amet urna venenatis sodales non sit amet ipsum. Quisque placerat quam eget fringilla faucibus. Etiam felis diam, eleifend a ornare bibendum, pretium vestibulum nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed varius enim nisi, in viverra mauris tristique in. Ut fringilla dictum dignissim. Fusce condimentum dui a justo eleifend, non lobortis enim ultrices. "
    },
    {
        name: "Desert Mesa", 
        image: "https://pixabay.com/get/eb34b50c20f3063ed1584d05fb1d4e97e07ee3d21cac104491f6c070a0e4bdbb_340.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc orci turpis, consectetur eget risus nec, accumsan imperdiet augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut est sit amet urna venenatis sodales non sit amet ipsum. Quisque placerat quam eget fringilla faucibus. Etiam felis diam, eleifend a ornare bibendum, pretium vestibulum nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed varius enim nisi, in viverra mauris tristique in. Ut fringilla dictum dignissim. Fusce condimentum dui a justo eleifend, non lobortis enim ultrices. "
    },
    {
        name: "Canyon Floor", 
        image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f6c078a3edbdbb_340.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc orci turpis, consectetur eget risus nec, accumsan imperdiet augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut est sit amet urna venenatis sodales non sit amet ipsum. Quisque placerat quam eget fringilla faucibus. Etiam felis diam, eleifend a ornare bibendum, pretium vestibulum nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed varius enim nisi, in viverra mauris tristique in. Ut fringilla dictum dignissim. Fusce condimentum dui a justo eleifend, non lobortis enim ultrices. "
    }
];

function seedDB() {
    //remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
    
        console.log("REMOVED CAMPGROUNDS!");
        //add campgrounds
        // data.forEach(function(seed) {
        //     Campground.create(seed, function(err, campground) {
        //         if(err) {
        //             console.log(err);
        //         }else {
        //             console.log("CAMPGROUND ADDED");
        //             //create a comment
        //             Comment.create(
        //                 {
        //                     text: "This place is great, but I wish there was internet.", 
        //                     author: "Homer"
        //                 }, function(err, comment) {
        //                     if(err) {
        //                         console.log(err);
        //                     }else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("NEW COMMENT CREATED");
        //                     }
        //             });
        //         }
        //     });
        // });
    });

    //add comments
}

module.exports = seedDB;