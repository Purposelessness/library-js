const logger = require('morgan');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// print request logs
app.use(logger('dev'));
// process body parameters
app.use(express.json());
// process url encoded parameters
app.use(express.urlencoded({extended: false}));
// process cookies
app.use(cookieParser());
// process public files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});