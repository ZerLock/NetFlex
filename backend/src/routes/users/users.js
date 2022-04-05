const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const { get_user_by_id } = require('./users.query');

router.get('/', (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    var decoded = jwt.verify(token, process.env.JWT_TOKEN);
    get_user_by_id(res, decoded.id);
});

module.exports = router;