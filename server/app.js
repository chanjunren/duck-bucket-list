const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places_routes');
const HttpError = require('./models/http_error');

const app = express();

// Parse the body first and then pass on to the next 
app.use(express.json());

app.use('/api/places', placesRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Are you lost? How did you get here :O', 404);
    throw error;
})

// Error handling middleware
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'Something went wrong on the server D: Please don\'t fire me'});
})

app.listen(5000);