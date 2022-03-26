const db = require('../../config/db');

exports.get_all_films = (res) => {
    db.execute('SELECT `id`, `title`, `description`, `picture`, `show_id`, `cast`, `director`, `release_year`, `rating`, `type`, `listed_in` FROM `films`', (error, results, fields) => {
        if (error) return res.status(500).json({ msg: 'internal server error' });
        res.status(200).json( results );
    });
};

exports.get_film_by_type = (res, type) => {
    db.execute('SELECT `id`, `title`, `description`, `picture`, `show_id`, `cast`, `director`, `release_year`, `rating`, `type`, `listed_in` FROM `films` WHERE `type` = ? ORDER BY RAND() LIMIT 60', [type], (error, results, fields) => {
        if (error) return res.status(500).json({ msg: 'internal server error' });
        res.status(200).json( results );
    });
};

exports.get_film_by_id = (res, id) => {
    db.execute('SELECT `id`, `title`, `description`, `picture`, `show_id`, `cast`, `director`, `release_year`, `rating`, `type`, `listed_in` FROM `films` WHERE `id` = ?', [id], (error, results, fields) => {
        if (error) return res.status(500).json({ msg: 'internal server error' });
        res.status(200).json( results );
    });
}

exports.get_all_by_search = (res, search) => {
    db.execute('SELECT `id`, `title`, `description`, `picture`, `show_id`, `cast`, `director`, `release_year`, `rating`, `type`, `listed_in` FROM `films` WHERE MATCH (title, description, cast) AGAINST (?)', [search], (error, results, fields) => {
        if (error) return res.status(500).json({ msg: 'internal server error (sql request)' });
        res.status(200).json( results );
    });
}
