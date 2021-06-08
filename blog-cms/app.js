var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var passport = require('passport');
var auth = require('./routes/auth');
var category = require('./routes/post');

var app = express();

app.use(passport.initialize());

mongoose.connect('mongodb://localhost/blog-cms', {
  promiseLibrary: require('bluebird'), //Check this
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => console.log("Connection successful"))
  .catch((err) => console.log(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('./api/auth', auth);
app.use('/api/category', category);
// app.use('/api/post', post);

module.exports = app;
