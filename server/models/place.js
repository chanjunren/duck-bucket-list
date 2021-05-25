const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        lat: { type: Number, required: true},
        long: { type: Number, required: true}
    },
    creator: { type: String, required: true }
});

module.exports = mongoose.model('Place', placeSchema);