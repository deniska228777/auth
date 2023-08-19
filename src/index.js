const mongoose = require("mongoose");
const url = 'mongodb+srv://deniska:hillclimb@cluster0.t80tjs5.mongodb.net/?retryWrites=true&w=majority'
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const routes = require("./routes.js");
const fileUpload = require("express-fileupload");
const allCodes = require("./allCodes.js");
const rout = require("./coreroutes.js");
const PORT = process.env.PORT || 5000;
dotenv.config();



app.use('/static', express.static('static'));
app.use('/src', express.static('src'));
app.use(express.json());
app.use(fileUpload({}));
app.use('/user', routes);
app.use('/codes', allCodes)
app.use('/', rout)

async function start() {
    await mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => app.listen(PORT, console.log(`сервер начал работу по ссылке http://localhost:${PORT}`)))
    .catch(() => res.status(404).redirect('/error'));
};

start();