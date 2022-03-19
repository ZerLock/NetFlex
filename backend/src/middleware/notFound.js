const db = require('../config/db');

exports.check_id = (req, res, next) => {
    const movie_id = req.params.id;

    if (movie_id) {
        db.execute('SELECT * FROM `films` WHERE `id` = ?', [movie_id], (error, results, fields) => {
            if (results.length > 0)
                next();
            else
                res.status(404).json({ msg: 'Not found' });
        });
    } else {
        res.status(500).json({ msg: 'internal server error' });
    }
}