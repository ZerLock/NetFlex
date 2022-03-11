const express = require('express');
const router = express.Router();

const { get_all_films, get_film_by_type } = require('./films.query')

router.get('/', (req, res, next) => {
    get_all_films(res);
});

router.post('/type', (req, res, next) => {
    const type = req.body.type;

    if (type !== 'TV Show' && type !== 'Movie')
        return res.status(400).json({ msg: 'bad entries' });
    get_film_by_type(res, type);
});

router.get('/movies', (req, res, next) => {
    res.status(200).json({ msg: 'movies' })
});

router.get('/tv_shows', (req, res, next) => {
    res.status(200).json({ msg: 'tv shows' });
});

module.exports = router;