const uuid = require("uuid");
const util = require('util');
const {validationResult} = require('express-validator');

const HttpError = require("../models/http_error");

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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.placeId;
  const place = DUMMY_PLACES.find((place) => place.id === placeId);
  if (!place) {
    return next(
      new HttpError("The place you are looking for could not be found! :(", 404)
    ); // MUST USE THIS FOR ASYCNCHRONOUS CODE
  }
  res.json({ place: place });
};

const getUserPlacesByUid = (req, res, next) => {
  const uid = req.params.userId;
  const userPlaces = DUMMY_PLACES.filter((place) => place.creator === uid);
  if (userPlaces.length === 0) {
    return next(
      new HttpError("This dude got nothing on his bucket list! :(", 404)
    ); // either next() or throw() | next() for async code
  }
  res.json({ user_places: userPlaces });
};

const createPlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(util.inspect(errors, false ,null, true));
    return next(new HttpError('Invalid inputs passed D:', 422));
  }

  const { title, description, coordinates, address, creator } = req.body;
  console.log("Received: " + JSON.stringify(req.body));
  const createdPlace = {
    id: uuid.v4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);
  console.log("Updated: === DUMMY_PLACES: ===\n" + JSON.stringify(DUMMY_PLACES));
  res.status(201).json({ place: createdPlace });
};

const updatePlaceById = (req, res, next) => {
  const placeId = req.params.placeId;
  const placeSpecified = {...DUMMY_PLACES.find((place) => place.id === placeId)};
  const placeIndex = DUMMY_PLACES.findIndex(place => place.id === placeId);

  if (!placeSpecified) {
    return next(
      new HttpError(
        404,
        `The place you are trying ${placeId} to update could not be found :(`
      )
    );
  }

  const newValues = req.body;
  for (var key in newValues) {
    if (!placeSpecified[key]) {
      return next(
        new HttpError(
          404,
          `Invalid key in update request`
        )
      );
    }
    placeSpecified[key] = newValues[key];
  }

  DUMMY_PLACES[placeIndex] = placeSpecified;

  console.log("=== Updated Places ===");

  for (var diFang of DUMMY_PLACES) {
    console.log(util.inspect(diFang, false, null, true /* enable colors */))

  }

  res.status(200).json({place: placeSpecified});
};

const deletePlaceById = (req, res, next) => {
  const placeId = req.params.placeId;
  if (!DUMMY_PLACES.find(p => p.id == placeId)) {
    return next(new HttpError("The place you are trying to delete does not exist! D:", 404));
  }

  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id != placeId);

  res.status(200).json({"Bye bye": DUMMY_PLACES});
};

exports.getPlaceById = getPlaceById;
exports.getUserPlacesByUid = getUserPlacesByUid;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
