const db = require('../../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = (res, firstname, name, nickname, email, password) => {
    db.execute('INSERT INTO `user` (firstname, name, nickname, email, password) VALUES (?, ?, ?, ?, ?)', [firstname, name, nickname, email, password], (error, results, fields) => {
        if (error) {
            if (error.code == 'ER_DUP_ENTRY') return res.status(401).json({ msg: 'accound already exists' });
            return res.status(500).json({ msg: 'internal server error (db request)' });
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
    db.execute('SELECT `id`, `password` FROM `user` WHERE `email` = ?', [email], (error, results, fields) => {
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

exports.get_user_by_id = (res, id) => {
    db.execute('SELECT * FROM `user` WHERE `id` = ?', [id], (error, results, fields) => {
        if (error) return res.status(500).json({ msg: 'internal server error (db request)' });
        res.status(200).json( results[0] );
    });
};

exports.delete_user_by_id = (res, id) => {
    db.execute('DELETE FROM `user` WHERE `id` = ?', [id], (error, results, fields) => {
        if (error) return res.status(500).json({  msg: 'internal server error (db request)' });
        res.status(200).json({ msg: 'user deleted' });
    });
};

exports.change_user_profile_image = (res, url, id) => {
    db.execute('UPDATE `user` SET `image_url` = ? WHERE `id` = ?', [url, id], (error, results, fields) => {
        if (error) return res.status(500).json({ msg: 'internal server error (db request)' });
        res.status(200).json( results );
    });
};

exports.change_user_password = (res, new_password, old_password, id) => {
    db.execute('SELECT `password` FROM `user` WHERE `id` = ?', [id], (error, results, fields) => {
        if (results.length != 1 || error)
            return res.status(500).json({ msg: 'internal server error (db request)' });
        bcrypt.compare(old_password, results[0].password)
            .then(valid => {
                if (!valid)
                    return res.status(401).json({ msg: 'Invalid Credentials' });
                db.execute('UPDATE `user` SET `password` = ? WHERE `id` = ?', [new_password, id], (err, resul, f) => {
                    if (err) return res.status(500).json({ msg: 'internal server error' });
                    res.status(200).json({ msg: 'password changed' });
                });
            })
            .catch(() => res.status(500).json({ msg: 'internal server error (bad password)' }));
    });
};

exports.change_user_nickname = (res, nickname, id) => {
    db.execute('UPDATE `user` SET `nickname` = ? WHERE `id` = ?', [nickname, id], (error, results, fields) => {
        if (error) return res.status(500).json({ msg: 'internal server error (db request)' });
        res.status(200).json({ msg: 'nickname changed' });
    });
};

// add_to_logs(email, req.headers['user-agent'], platform, language, encoding, is_on_mobile, ip, lookup(ip).country);
exports.add_to_logs = (email, user_agent, navigateur, platform, langauge, encoding, is_on_mobile, ip, country) => {
    db.execute('INSERT INTO `logs` (user_email, user_agent, navigateur, platform, language, encoding, is_on_mobile, ip_address, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [email, user_agent, navigateur, platform, langauge, encoding, is_on_mobile, ip, country], (error, results, fields) => {
        if (error) console.log(error);
    });
};