const express = require("express");
const routeController = require("./../controllers/routeController");

const router = express.Router();

router.post("/", routeController.addRoute);
router.post("/:routeId/:postId", routeController.addPostToRoute);
router.post("/addRouteToGym/:routeId/:gymId", routeController.addRouteToGym);
router.get("/getAll", routeController.getAllRoutes);
router.get("/:routeId", routeController.getRoute);
router.delete("/:routeId", routeController.deleteRoute);

module.exports = router;
