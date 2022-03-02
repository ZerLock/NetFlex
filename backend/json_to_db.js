const dotenv = require('dotenv');
dotenv.config();
const connection = require('./src/config/db');

var json = require("./movies.json")

const movies = JSON.parse(JSON.stringify(json));

movies.forEach(movie => {
    const tmp = new Date(movie.date_added);
    const date = String(tmp.getFullYear()) + '-' + String(tmp.getMonth()).padStart(2, '0') + '-' + String(tmp.getDate()).padStart(2, '0') + ' ' + String(tmp.getHours()).padStart(2, '0') + ':00:00';
    connection.execute('INSERT INTO `films` (show_id, type, title, director, cast, country, date_added, release_year, rating, duration, listed_in, description, picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [movie.show_id, movie.type, movie.title, movie.director, movie.cast, movie.country, new Date(date), movie.release_year, movie.rating, movie.duration, movie.listed_in, movie.description, movie.picture], (err, res, f) => {
        if (err)
            console.error(err.stack);
    });
});