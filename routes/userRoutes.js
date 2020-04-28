const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.get(
  "/me",
  authController.protect,
  userController.getMe,
  userController.getUserByUsername
);

router.patch("/photo", authController.protect, userController.updatePhoto);

router.get("/getAll", userController.getAllUsers);
router.get("/:username", userController.getUserByUsername);
router.get("/getById/:userId", userController.getUserById);

module.exports = router;
