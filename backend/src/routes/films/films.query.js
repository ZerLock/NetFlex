const db = require('../../config/db');

exports.get_all_films = (res) => {
    db.execute('SELECT * FROM `films`', (error, results, fields) => {
        if (error) return res.status(500).json({ msg: 'internal server error' });
        res.status(200).json( results );
    });
};

exports.get_film_by_type = (res, type) => {
    db.execute('SELECT * FROM `films` WHERE type = ? ORDER BY RAND() LIMIT 20', [type], (error, results, fields) => {
        if (error) return res.status(500).json({ msg: 'internal server error' });
        res.status(200).json( results );
    });
};