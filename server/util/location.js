const axios = require('axios');

const HttpError = require('../models/http_error');

const API_KEY = "AIzaSyCRSMyjYX1JduDq7SB285Cv_Ytn7d0udOA";

async function getCoordinatesFromAddress(address) {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);

    const data = response.data;
    console.log(data);

    if (!data || data.status === 'ZERO_RESULTS' || data.status === 'REQUEST_DENIED') {
        console.log("Error thrown");
        const error = new HttpError("Could not find location for the specified address D:", 422);
        throw error;
    }
    // return data.results[0].geometry.location;
    const coordinates = data.results[0].geometry.location;

    return coordinates;
}

module.exports = getCoordinatesFromAddress;