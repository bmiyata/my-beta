const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Post must belong to a user"],
  },
  username: {
    type: String,
  },
  userPhotoURL: {
    type: String,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  notes: String,
  comments: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  videoURL: String,
  imageURL: String,
  route: {
    type: mongoose.Schema.ObjectId,
  },
  gym: String,
  grade: Number,
});

// postSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: "user",
//     select: "username photoURL",
//   });

//   next();
// });

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
