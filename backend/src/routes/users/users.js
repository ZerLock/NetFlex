const db = require('../../config/db');
const jwt = require('jsonwebtoken');

exports.register = (res, firstname, name, nickname, email, password) => {
    db.execute('INSERT INTO `user` (firstname, name, nickname, email, password) VALUES (?, ?, ?, ?, ?)', [firstname, name, nickname, email, password], (error, results, fields) => {
        if (error) {
            if (error.code == 'ER_DUP_ENTRY') res.status(401).json({ msg: 'accound already exists' });
            else res.status(500).json({ msg: 'internal server error' });
            return;
        }
        const token = jwt.sign(
            { id: results.insertId },
            process.env.JWT_TOKEN,
            { expiresIn: '24h' }
        );
        res.status(201).json({ token: token });
    });
};

exports.login = (res, email, password) => {
    db.execute('SELECT * FROM ')
};