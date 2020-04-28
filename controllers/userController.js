const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getUserByUsername = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username }).select(
    "-email"
  );

  if (!user) {
    return next(new AppError("No User Found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return next(new AppError("No User Found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  console.log("inside getme");
  req.params.username = req.user.username;
  req.params.id = req.user.id;
  next();
});

// exports.updateMe = catchAsync(async (req, res, next) => {
//   if (req.body.password || req.body.passwordConfirm) {
//     return next(new AppError("This route is not for password updates", 400));
//   }

//   const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   res.status(200).json({
//     status: "success",
//     data: {
//       user: updatedUser,
//     },
//   });
// });

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.updatePhoto = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      photoURL: req.body.photoURL,
      photoPathReference: req.body.photoPathReference,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
