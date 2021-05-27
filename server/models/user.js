const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Unique for indexing => faster queries
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    imageUrl: {type: String, required: true},
    places: {type: String, required: false}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);