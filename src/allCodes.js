const express = require("express");
const app = express();
const Code = require("./codes.js");

app.get('/all', async (req, res) => {
    await Code.find()
    .then(all => res.json(all))
    .catch(err => res.json(err))
});

module.exports = app;