const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Code = require("./codes.js");
const url = 'mongodb+srv://deniska:hillclimb@cluster0.t80tjs5.mongodb.net/?retryWrites=true&w=majority'
const express = require("express");
const app = express();
const routes = require("./routes.js");
const fileUpload = require("express-fileupload");
const bp = require("body-parser");
const UserService = require("./UserService.js");
const allCodes = require("./allCodes.js");
const bcrypt = require("bcryptjs");
const path = require("path");

dotenv.config();

const PORT = process.env.PORT || 5000;
const urlParser = bp.urlencoded({ extended: false }); 

app.use('/static', express.static('static'));
app.use('/src', express.static('src'));
app.use(express.json());
app.use(fileUpload({}));
app.use('/user', routes);
app.use('/codes', allCodes)
app.get('/', (req, res) => {
    res.sendFile(path.resolve('public', 'index.html'));
});
app.get('/error', (req, res) => {
    res.sendFile(path.resolve('public', 'error.html'));
});
app.post('/auth', urlParser, async (req, res) => {
    const { name, email, password } = req.body;
    const hashPass = bcrypt.hashSync(password, 12);
    try {
        await UserService.create({name: name, email: email, password: hashPass, userpicture: req.files.picture})
        res.sendFile(path.resolve('public', 'index.html'));
    } catch(error) {
        if (error.code == 11000) {
            res.redirect('/?error=true');    
        }
    };
});
app.post('/authh', async (req, res) => {
    await Code.create({code: req.body.code})
    .then(() => console.log('даа'))
    .catch(err => console.log(err));
    console.log(req.body.code);
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html')
});
app.post('/posts', urlParser, async (req, res) => {
        const user = await UserService.findByEmail(req.body.email);
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                console.log(err);
                return;
            };
            if (result) {
                res.send(result);
            } else {
                res.redirect(302, '/error');
            };
        });
})
app.post('/auth/authconfirm', urlParser, async (req, res) => {
    const thatOneCode = await Code.findOne({code: req.body.code});
    try {
        if (thatOneCode) {
            await Code.findOneAndDelete({code: req.body.code})
            .then(() => res.redirect('/login'))
        }
        if (!thatOneCode) {
           res.redirect('/error');
       };
    } catch(error) {
        console.log(error)
    };
});

async function start() {
    await mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => app.listen(PORT, console.log(`сервер начал работу по ссылке http://localhost:${PORT}`)))
    .catch(() => res.status(500).redirect('/error'));
};

start();