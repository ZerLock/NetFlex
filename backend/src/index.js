const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
dotenv.config();

const auth = require('./middleware/auth');

const authRoutes = require('./routes/auth/auth');
const filmsRoutes = require('./routes/films/films');
const userRoutes = require('./routes/users/users');

app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
app.use('/films', auth, filmsRoutes);
app.use('/user', auth, userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on http://localhost:${process.env.PORT}`);
});