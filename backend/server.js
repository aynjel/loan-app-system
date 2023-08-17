require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const debugServer = require('debug')('backend:server');
const debug = require('debug')('backend:app');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res) => {
    debug(err.message);
    res.status(err.status || 500);
    res.send(err.message);
});

app.listen(process.env.PORT, () => {
    debugServer(`Server is running on port ${process.env.PORT}, go to http://localhost:${process.env.PORT}`);
});