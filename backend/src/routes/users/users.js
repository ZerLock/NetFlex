const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { validSearch } = require('../../config/regex');

const { get_user_by_id } = require('./users.query');

router.get('/', (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];

    var decoded = jwt.decode(token, {complete: true});
    console.log(decoded);
    get_user_by_id(decoded);
});

module.exports = router;