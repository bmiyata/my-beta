const Post = require("./../models/postModel");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.addPostToUser = catchAsync(async (req, res, next) => {
  const newPost = await Post.create({
    user: req.user.id,
    notes: req.body.notes,
    videoURL: req.body.videoURL,
    grade: req.body.grade,
    gym: req.body.gym,
    route: req.body.route,
  });

  console.log(newPost);

  const user = await User.findById(req.user.id);

  user.posts.unshift(newPost);

  await user.save({ validateBeforeSave: false });

  // const updatedUser = await User.findByIdAndUpdate(
  //   req.user.id,
  //   { $push: { posts: newPost.id } },
  //   { new: true }
  // );

  res.status(200).json({
    status: "success",
    data: {
      newPost,
    },
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  await Post.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("No post found", 400));
  }

  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});

exports.getPosts = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError("No User Found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      posts: user.posts,
    },
  });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    status: "success",
    data: {
      posts,
    },
  });
});

exports.addLike = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new AppError("No post found", 400));
  }

  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
  ) {
    return next(new AppError("Post already liked by this user", 400));
  }

  post.likes.unshift({ user: req.user.id });
  await post.save();
  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});

exports.unlike = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new AppError("No post found", 400));
  }

  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length ===
    0
  ) {
    return next(new AppError("Post has not been liked by this user", 400));
  }

  const removeIndex = post.likes
    .map((like) => like.user.toString())
    .indexOf(req.user.id);
  post.likes.splice(removeIndex, 1);
  await post.save();

  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});

exports.addComment = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("No post found", 400));
  }

  post.comments.unshift({
    user: req.user.id,
    text: req.body.text,
  });

  await post.save();

  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});

exports.removeComment = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("No post found", 400));
  }

  const removeIndex = post.comments
    .map((comment) => comment.id)
    .indexOf(req.params.commentId);

  post.comments.splice(removeIndex, 1);
  await post.save();

  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});
