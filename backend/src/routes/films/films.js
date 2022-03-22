const express = require('express');
const router = express.Router();

const { get_all_films, get_film_by_type, get_film_by_id, get_all_by_search } = require('./films.query');
const { check_id } = require('../../middleware/notFound')

const { validSearch } = require("../../config/regex");

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

router.get('/:id', check_id, (req, res, next) => {
    get_film_by_id(res, req.params.id);
});

router.post('/browse', (req, res, next) => {
    const search = req.body.search;

    if (!search || !validSearch.test(search))
        return res.status(400).json({ msg: 'bad entries' });
    get_all_by_search(res, search);
});

module.exports = router;