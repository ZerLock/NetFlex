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

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// });

app.use(express.json());

app.use('/', authRoutes);
app.use('/films', auth, filmsRoutes);
app.use('/user', auth, userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on http://localhost:${process.env.PORT}`);
});