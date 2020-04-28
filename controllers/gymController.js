const Gym = require("./../models/gymModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.addGym = catchAsync(async (req, res, next) => {
  const newGym = await Gym.create({
    name: req.body.name,
    address: req.body.address,
    imageURL: req.body.imageURL
  });

  res.status(200).json({
    status: "success",
    data: {
      newGym
    }
  });
});

exports.deleteGym = catchAsync(async (req, res, next) => {
  await Gym.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null
  });
});

exports.getGym = catchAsync(async (req, res, next) => {
  const gym = await Gym.findById(req.params.id);

  if (!gym) {
    return next(new AppError("No gym found", 400));
  }

  res.status(200).json({
    status: "success",
    data: {
      gym
    }
  });
});

exports.getGyms = catchAsync(async (req, res, next) => {
  const gyms = await Gym.find();

  res.status(200).json({
    status: "success",
    data: {
      gyms
    }
  });
});

exports.getGymRoutes = catchAsync(async (req, res, next) => {
  const gym = await Gym.findById(req.params.id);
  if (!gym) {
    return next(new AppError("No gym found", 400));
  }

  res.status(200).json({
    status: "success",
    data: {
      routes: gym.routes
    }
  });
});
