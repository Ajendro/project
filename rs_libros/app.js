require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./conexion/mogoose')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Puedes ajustar la configuración según tus necesidades
const cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var recommendationRouter = require('./routes/recommendation');
var postRouter = require('./routes/post'); 
var messageRouter = require('./routes/messages'); 
var exchangeRouter = require('./routes/exchange'); 
var bookRouter = require('./routes/book'); 
const loginRoute = require('./routes/login');

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter); // este es la api de users
app.use('/recommendation', recommendationRouter);
app.use ('/post', postRouter);
app.use('/messages', messageRouter);
app.use('/exchange', exchangeRouter);
app.use('/book', bookRouter);
app.use('/auth', loginRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
