const util = require('util');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require("../models/http_error");
const getCoordinatesFromAddress = require("../util/location");
const Place = require('../models/place');
const User = require('../models/user');

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
    const userWithPlaces = await User.findById(uid).populate('places');
    // console.log("User found: " + JSON.stringify(userWithPlaces));
    // console.log("Places length: " + userWithPlaces.places.length);
    if (!userWithPlaces || userWithPlaces.places.length === 0) {
      return next(
        new HttpError("This dude got nothing on his bucket list! :(", 404)
      ); // either next() or throw() | next() for async code
    }
    res.json({ user_places: userWithPlaces.places.map(place => place.toObject({ getters: true })) });
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

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    return next(new HttpError("An error occured while looking for the associated creator! D:", 500));
  }
  if (!user) {
    return next(new HttpError("The associated creator could not be found! D:", 404));
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
    const session = await mongoose.startSession();
    session.startTransaction();
    await newPlace.save({session: session});
    await user.places.push(newPlace);
    await user.save({session: session});
    await session.commitTransaction();
    res.status(201).json({"Created place": newPlace.toObject({getters: true})});
  } catch (err) {
    console.error(err);
    return next(new HttpError("An error occured while trying to save this place! D:", 500));
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
    if (!placeSpecified[key]) {
      return next(
        new HttpError(
          `Invalid key in update request`, 500,
        )
      );
    }
  }

  for (var key in newValues) {
    placeSpecified[key] = newValues[key];
    if (key == 'address') {
      let coordinates;
      try {
        coordinates = await getCoordinatesFromAddress(newValues[key]);
        console.log("Received coordinates: " + JSON.stringify(coordinates));
      } catch (error) {
        return next(error);
      }    
      placeSpecified.location = coordinates;
    }
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
    place = await Place.findById(placeId).populate('creator');
    console.log("Place found: " + JSON.stringify(place));
  } catch (err) { 
    return next(new HttpError("Something went wrong when looking for the place to be deleted! D:", 500));
  }

  if (!place) {
    return next(new HttpError("The place you are trying to delete could not be found! D:", 404));
  }
  
  // Removing place from database and associated creator
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await place.remove({session: session});

    // place.creator returns the user object
    place.creator.places.pull(place);
    await place.creator.save({session: session});
    await session.commitTransaction();
  } catch (err) {
    return next(new HttpError("Something went wrong when trying to delete this place! D:", 500));
  }
  res.status(200).json({ "This item has been deleted! :D": place });
};

exports.getPlaceById = getPlaceById;
exports.getUserPlacesByUid = getUserPlacesByUid;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
