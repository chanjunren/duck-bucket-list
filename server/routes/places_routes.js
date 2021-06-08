const express = require("express");
const { check } = require('express-validator');

const fileUpload = require('../middleware/file_upload');
const placeController = require('../controllers/places_controller');
const checkAuthentication = require("../middleware/check_authentication");

const router = express.Router();

router.get("/:placeId", placeController.getPlaceById);

router.get("/user/:userId", placeController.getUserPlacesByUid);

router.use(checkAuthentication);

router.post("/",
    fileUpload.single('image'),
    [check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty()],
    placeController.createPlace);

router.patch("/:placeId", placeController.updatePlaceById);

router.delete("/:placeId", placeController.deletePlaceById)

module.exports = router;
