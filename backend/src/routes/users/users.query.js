const db = require('../../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = (res, firstname, name, nickname, email, password) => {
    db.execute('INSERT INTO `user` (firstname, name, nickname, email, password) VALUES (?, ?, ?, ?, ?)', [firstname, name, nickname, email, password], (error, results, fields) => {
        if (error) {
            if (error.code == 'ER_DUP_ENTRY') res.status(401).json({ msg: 'accound already exists' });
            else res.status(500).json({ msg: 'internal server error (db request)' });
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
    db.execute('SELECT `password` FROM `user` WHERE `email` = ?', [email], (error, results, fields) => {
        if (results.length != 1 || error)
            return res.status(500).json({ msg: 'internal server error (db request)' });
        bcrypt.compare(password, results[0].password)
            .then(valid => {
                if (!valid)
                    return res.status(401).json({ msg: 'Invalid Credentials' });
                    const token = jwt.sign(
                        { id: results[0].id },
                        process.env.JWT_TOKEN,
                        { expiresIn: '24h' }
                    );
                    res.status(200).json({ token: token });
            })
            .catch(() => res.status(500).json({ msg: 'internal server error (bad password)' }));
    });
};