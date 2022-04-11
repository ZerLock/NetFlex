const express = require('express');
const router = express.Router();

const { is_good_data } = require('../../middleware/datas');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { get_user_by_id, delete_user_by_id, change_user_profile_image, change_user_password, change_user_nickname } = require('./users.query');

router.get('/', (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    var decoded = jwt.verify(token, process.env.JWT_TOKEN);
    get_user_by_id(res, decoded.id);
});

router.delete('/', (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    var decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (!is_good_data(decoded))
        return res.status(400).json({ msg: 'bad entries' });
    delete_user_by_id(res, decoded.id);
});

router.put('/profile_image', (req, res, next) => {
    const image_url = req.body.image_url;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (!is_good_data(image_url) || !is_good_data(decoded))
        return res.status(400).json({ msg: 'bad entries' });
    change_user_profile_image(res, image_url, decoded.id);
});

router.put('/password', (req, res, next) => {
    const new_password = req.body.new;
    const old_password = req.body.old;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (!is_good_data(new_password) || !is_good_data(old_password) || !is_good_data(decoded))
        return res.status(400).json({ msg: 'bad entries' });

    bcrypt.hash(new_password, 10)
        .then(hash_new => {
            change_user_password(res, hash_new, old_password, decoded.id);
        }).catch(() => res.status(500).json({ msg: 'internal server error (hash password)' }));
});

router.put('/nickname', (req, res, next) => {
    const nickname = req.body.nickname;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (!is_good_data(nickname) || !is_good_data(decoded))
        return res.status(400).json({ msg: 'bad entries' });
    change_user_nickname(res, nickname, decoded.id);
});

module.exports = router;