const express = require('express');

const app = express();

console.log("Running server..");

app.use((req, res, next) => {
    console.log("I'm the middleware!");
    // next();
})

app.use((req, res, next) => {
    console.log("Request received!");
    res.send('<form method="POST"><input type="text" name="username"/><button type="submit">HIHI</button></form>')
})

app.listen(5000);