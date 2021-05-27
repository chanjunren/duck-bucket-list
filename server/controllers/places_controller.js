const util = require('util');
const { validationResult } = require('express-validator');

const HttpError = require("../models/http_error");
const getCoordinatesFromAddress = require("../util/location");
const Place = require('../models/place');

var DUMMY_PLACES = [
  {
    id: "p1",
    title: "Himalayans",
    description:
      "Legendary mountain range featuring numerous towering peaks, including Mount Everest!",
    imageUrl:
      "https://deih43ym53wif.cloudfront.net/everest-base-camp-himalayas-nepal_08bc81b2f2.jpeg",
    address:
      "Mountain Range (India, Pakistan, Afghanistan, China, Bhutan and Nepal)",
    location: {
      lat: 30.0925684,
      lng: 76.5389941,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "The Lofoten Islands",
    description:
      "Lofoten is known for excellent fishing, nature attractions such as the northern lights and the midnight sun, and small villages off the beaten track",
    imageUrl:
      "https://img.traveltriangle.com/blog/wp-content/uploads/2018/11/lofoten1.jpg",
    address: "8314 Gimsøysand, Norway",
    location: {
      lat: 68.4716466,
      lng: 13.8568658,
    },
    creator: "u1",
  },
];

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.placeId;
  try {
    const place = await Place.findById(placeId);
    res.json({ place: place.toObject({ getters: true }) });
  } catch (err) {
    return next(
      new HttpError("Something went wrong while trying to get this resource! :(", 404)
    ); // MUST USE THIS FOR ASYCNCHRONOUS CODE
  }
};

const getUserPlacesByUid = async (req, res, next) => {
  const uid = req.params.userId;
  try {
    const userPlaces = await Place.find({ creator: uid });
    if (userPlaces.length === 0) {
      return next(
        new HttpError("This dude got nothing on his bucket list! :(", 404)
      ); // either next() or throw() | next() for async code
    }
    res.json({ user_places: userPlaces.map(place => place.toObject({ getters: true })) });
  } catch (err) {
    return next(
      new HttpError("This dude is not found in our database D:", 404)
    );
  }
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(util.inspect(errors, false, null, true));
    return next(new HttpError('Invalid inputs passed D:', 422));
  }
  const { title, description, imageUrl, address, creator } = req.body;

  let coordinates;

  try {
    coordinates = await getCoordinatesFromAddress(address);
    console.log("Received coordinates: " + JSON.stringify(coordinates));
  } catch (error) {
    return next(error);
  }

  const newPlace = new Place({
    title: title,
    description: description,
    image: imageUrl,
    address: address,
    location: coordinates,
    creator: creator
  });

  try {
    newPlace.save().then(() => {
      console.log("Created new place successfully!");
      res.status(201).json({ place: newPlace });
    });
  } catch (error) {
    return next(error);
  }
};

const updatePlaceById = async (req, res, next) => {
  const placeId = req.params.placeId;

  const newValues = req.body;
  let placeSpecified;

  try {
    placeSpecified = await Place.findById(placeId);
  } catch (err) {
    return next(new HttpError('Place to be updated could not be found! D:', 404));
  }

  for (var key in newValues) {
    if (!placeSpecified[key] || key === 'address' || key === 'location') {
      return next(
        new HttpError(
          `Invalid key in update request`, 500,

        )
      );
    }
  }

  for (var key in newValues) {
    placeSpecified[key] = newValues[key];
  }

  try {
    await placeSpecified.save();
    res.status(200).json({ updatedPlace: placeSpecified.toObject({ getters: true }) });
  } catch (err) {
    return next(new HttpError('Something went wrong while saving the updated place! D:', 500));
  }
};

const deletePlaceById = async (req, res, next) => {
  const placeId = req.params.placeId;
  let place;
  try {
    place = await Place.findById(placeId);
    await place.remove();
  } catch (err) {
    return next(new HttpError("The place you are trying to delete could not be found! D:", 404));
  }
  res.status(200).json({ "This item has been deleted! :D": place });
};

exports.getPlaceById = getPlaceById;
exports.getUserPlacesByUid = getUserPlacesByUid;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
