var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

let usersRouter = require('./routes/users');

let app = express()

let port = 9000

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// use cors to allow cross origin resource sharing
app.use(cors({
  origin: true, // Origin: true allows request from all URL's.
  credentials: true,
}));

// base routes for modules
app.use('/users', usersRouter);

// Ping route to check health of instance for load balancer
app.get('/ping', (req, res) => {
  return res.status(200).send('Ping pass');
});

// This app starts a server and listens on port 3000 for connections.
app.listen(port, () => {
  console.log(`Backend server listening on ${port}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;