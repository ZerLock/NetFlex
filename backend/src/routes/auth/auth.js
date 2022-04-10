const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const { lookup } = require('geoip-lite');

const { is_good_data } = require('../../middleware/datas');
const { register, login } = require('../users/users.query');
const { valideEmail } = require('../../config/regex');

router.post('/register', (req, res) => {
    var firstname = req.body.firstname;
    var name = req.body.name;
    var nickname = req.body.nickname;
    var email = req.body.email;
    var password = req.body.password;

    if (!is_good_data(firstname)) {
        console.log('firstname is not good');
        return res.status(500).json({ msg: 'internal server error (bad entries)' });
    }
    if (!is_good_data(name)) {
        console.log('bad name');
        return res.status(500).json({ msg: 'internal server error (bad entries)' });
    }
    if (!is_good_data(nickname)) {
        console.log('bad nickname');
        return res.status(500).json({ msg: 'internal server error (bad entries)' });
    }
    if (!is_good_data(email)) {
        console.log('bad email');
        return res.status(500).json({ msg: 'internal server error (bad entries)' });
    }
    if (!is_good_data(password)) {
        console.log('bad password');
        return res.status(500).json({ msg: 'internal server error (bad entries)' });
    }
    if (!valideEmail.test(email)) {
        console.log('regex email');
        return res.status(500).json({ msg: 'internal server error (bad entries)' });
    }


    bcrypt.hash(password, 10)
        .then(hash => {
            register(res, firstname, name, nickname, email, hash);
        })
        .catch(() => res.status(500).json({ msg: 'internal server error (hash password)' }));
});

router.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    if (!is_good_data(email) || !is_good_data(password) || !valideEmail.test(email))
        return res.status(500).json({ msg: 'internal server error' });
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('ip :', ip);
    console.log(lookup(ip));
    console.log(req.headers);
    login(res, email, password);
});

module.exports = router;