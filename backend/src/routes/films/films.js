const express = require('express');
const router = express.Router();

const { get_all_films, get_film_by_type, get_film_by_id, get_all_by_search, get_film_by_genre_and_type } = require('./films.query');
const { check_id } = require('../../middleware/notFound')

const { validSearch } = require("../../config/regex");
const { is_good_data } = require('../../middleware/datas');

router.get('/', (req, res, next) => {
    get_all_films(res);
});

router.post('/type', (req, res, next) => {
    const type = req.body.type;

    if (type !== 'TV Show' && type !== 'Movie')
        return res.status(400).json({ msg: 'bad entries' });
    get_film_by_type(res, type);
});

router.get('/:id', check_id, (req, res, next) => {
    get_film_by_id(res, req.params.id);
});

router.post('/browse', (req, res, next) => {
    const search = req.body.search;

    if (!is_good_data(search) || (!validSearch.test(search) && search !== '*'))
        return res.status(400).json({ msg: 'bad entries' });
    if (search === '*')
        get_all_films(res);
    else
        get_all_by_search(res, search);
});

router.post('/genre', (req, res, next) => {
    const genre = req.body.genre;
    const type = req.body.type;

    if (genre === '*')
        get_film_by_type(res, type);
    else
        get_film_by_genre_and_type(res, genre, type);
});

module.exports = router;