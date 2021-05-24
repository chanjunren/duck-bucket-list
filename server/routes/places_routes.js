const express = require("express");

const placeController = require('../controllers/places_controller');

const router = express.Router();

router.get("/:placeId", placeController.getPlaceById);

router.get("/user/:userId", placeController.getUserPlacesByUid);

router.post("/", placeController.createPlace);

router.patch("/:placeId", placeController.updatePlaceById);

router.delete("/:placeId", placeController.deletePlaceById)

module.exports = router;
