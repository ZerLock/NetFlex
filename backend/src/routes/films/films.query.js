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
    search = `%${search}%`;
    db.execute('SELECT `id`, `title`, `description`, `picture`, `show_id`, `cast`, `director`, `release_year`, `rating`, `type`, `listed_in` FROM `films` WHERE `title` LIKE ? OR `description` LIKE ? OR `cast` LIKE ?', [search, search, search], (error, results, fields) => {
        if (error) return res.status(500).json({ msg: 'internal server error (sql request)' });
        res.status(200).json( results );
    });
}

exports.get_film_by_genre_and_type = (res, genre, type) => {
    genre = `%${genre}%`;
    db.execute('SELECT * FROM `films` WHERE type = ? AND listed_in LIKE ? ORDER BY RAND() LIMIT 60', [type, genre], (error, results, fields) => {
        if (error) return res.status(500).json({ msg: 'internal server error' });
        res.status(200).json( results );
    });
};