const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  grade: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    required: [true, "A route must have a difficulty grade"],
  },
  location: {
    type: String,
    require: [true, "Please enter the location of the route"],
  },
  color: {
    type: String,
    required: [true, "Please enter the color of the holds."],
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  imageURL: {
    type: String,
    required: [true, "Please enter the imageURL to the route"],
  },
  gym: String,
});

routeSchema.pre(/^find/, function(next) {
  this.populate({
    path: "posts",
  });
  next();
});

const Route = mongoose.model("Route", routeSchema);
module.exports = Route;
