const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Route = require("./../models/routeModel");
const Post = require("./../models/postModel");
const Gym = require("./../models/gymModel");

exports.addRoute = catchAsync(async (req, res, next) => {
  const newRoute = await Route.create({
    grade: req.body.grade,
    location: req.body.location,
    color: req.body.color,
    imageURL: req.body.imageURL,
    gym: req.body.gym,
  });

  res.status(200).json({
    status: "success",
    data: {
      newRoute,
    },
  });
});

exports.addPostToRoute = catchAsync(async (req, res, next) => {
  const route = await Route.findById(req.params.routeId);
  const post = await Post.findById(req.params.postId);

  if (!route) {
    return next(new AppError("No route found", 400));
  }

  if (!post) {
    return next(new AppError("No post found", 400));
  }

  route.posts.unshift(post.id);
  await route.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    data: {
      route,
    },
  });
});

exports.getRoute = catchAsync(async (req, res, next) => {
  const route = await Route.findById(req.params.routeId);
  if (!route) {
    return next(new AppError("No route found", 400));
  }

  res.status(200).json({
    status: "success",
    data: {
      route,
    },
  });
});

exports.getAllRoutes = catchAsync(async (req, res, next) => {
  const routes = await Route.find();

  res.status(200).json({
    status: "success",
    data: {
      routes,
    },
  });
});

exports.addRouteToGym = catchAsync(async (req, res, next) => {
  const gym = await Gym.findById(req.params.gymId);
  const route = await Route.findById(req.params.routeId);

  if (!gym) {
    return next(new AppError("No gym found", 400));
  }

  if (!route) {
    return next(new AppError("No route found", 400));
  }

  gym.routes.push(route.id);
  await gym.save();
  res.status(200).json({
    status: "success",
    data: {
      gym,
    },
  });
});

exports.deleteRoute = catchAsync(async (req, res, next) => {
  await Route.findByIdAndDelete(req.params.routeId);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
