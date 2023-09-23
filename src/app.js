import path from 'path';

import express from 'express';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import morgan from 'morgan';

import {__dirname} from './config.js';
import backendRoutes from './loaders/backend_routes.js';
import frontendRoutes from './loaders/frontend_routes.js';

const app = express();

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// compress all responses with gzip
app.use(compression());
// print request logs
app.use(morgan('dev'));
// process body parameters
app.use(express.json());
// process url encoded parameters
app.use(express.urlencoded({extended: false}));
// process cookies
app.use(cookieParser());
// process public files
app.use(express.static(path.join(__dirname, 'public')));

frontendRoutes(app);
backendRoutes(app);

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