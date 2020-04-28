const express = require("express");
const gymController = require("./../controllers/gymController");

const router = express.Router();

router.post("/", gymController.addGym);
router.delete("/:id", gymController.deleteGym);
router.get("/getAll", gymController.getGyms);
router.get("/:id", gymController.getGym);

module.exports = router;
