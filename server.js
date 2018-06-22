
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const server = express();

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'hbs');

server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));

server.use('/', indexRouter);
server.use('/users', usersRouter);


//Begin error handlers
const createError = require('http-errors');
// catch 404 and forward to error handler
server.use(function(req, res, next) {
  next(createError(404));
});

// error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.server.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//End error handlers

const PORT = process.env.PORT || 8080;

//Socket.io configuration
const socket = require('http').Server(server); //Create a new HTTP Server to run Socket.io
const io = require('socket.io')(socket); //Use that server to run Socket.io

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})

module.exports = {
  server,
  io
}
