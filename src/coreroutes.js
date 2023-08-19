const router = require("express");
const rout = router()
const path = require("path");
const Code = require("./codes.js");
const UserService = require("./UserService.js");
const bcrypt = require("bcryptjs");
const bp = require("body-parser");

const urlParser = bp.urlencoded({ extended: false }); 


rout.get('/', (req, res) => {
    res.sendFile(path.resolve('public', 'index.html'));
});
rout.get('/error', (req, res) => {
    res.sendFile(path.resolve('public', 'error.html'));
});
rout.post('/auth', urlParser, async (req, res) => {
    const { name, email, password } = req.body;
    const hashPass = bcrypt.hashSync(password, 12);
    try {
        await UserService.create({name: name, email: email, password: hashPass, userpicture: req.files.picture})
        res.sendFile(path.resolve('public', 'auth.html'));
    } catch(error) {
        if (error.code == 11000) {
            res.redirect('/?error=true');    
        }
    };
});
rout.post('/authh', async (req, res) => {
    await Code.create({code: req.body.code})
    .then(() => console.log('даа'))
    .catch(err => console.log(err));
    console.log(req.body.code);
});
rout.get('/login', (req, res) => {
    res.sendFile(path.resolve('public', 'login.html'))
});
rout.post('/posts', urlParser, async (req, res) => {
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
rout.post('/auth/authconfirm', urlParser, async (req, res) => {
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

module.exports = rout;