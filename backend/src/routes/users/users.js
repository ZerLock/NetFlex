const express = require('express');
const router = express.Router();

const { is_good_data } = require('../../middleware/datas');

const jwt = require('jsonwebtoken');
const { get_user_by_id, delete_user_by_id, change_user_profile_image } = require('./users.query');

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

module.exports = router;